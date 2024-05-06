import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Password } from '../securities/password';
import { Token } from '../securities/token';
import { UserUpdate, UserInsert, User, UserLogin, UserRequestRecover, UserRecoverPwd } from '../models/userModel';
import { validate } from 'class-validator';
import { EmailOptions, TemplateEmail, generateRandomCode, sendEmail } from '../utils/email';
import { validarUUID } from '../utils/validate';

export class UserController {
  static async getUserMe(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!validarUUID(userId)) {
      return res.status(400).json({ msg: 'ID do usuário inválido' });
    }

    const { user, error } = await UserService.getUserById(userId);
    if (error) {
      return res.status(500).json({ msg: error });
    }
    if (!user) {
      return res.status(404).json({ msg: 'Nenhum usuário encontrado' });
    }

    return res.status(200).json(user);
  }

  static async createUser(req: Request, res: Response): Promise<Response> {
    const payload = new UserInsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : "Parâmetros inválidos e/ou incompletos";
      return res.status(400).json({ msg: errorMessage });
    }

    const { user: existingUser, error: getUserEmailError } = await UserService.getUserByEmail(payload.email);
    if (getUserEmailError) {
      return res.status(500).json({ msg: getUserEmailError });
    }
    if (existingUser) {
      return res.status(400).json({ msg: "Este email já está cadastrado" });
    }

    payload.pwd = await Password.hashPassword(payload.pwd)

    const { createdUserID, error: createUserError } = await UserService.createUser(payload);
    if (createUserError) {
      return res.status(500).json({ msg: createUserError });
    }
    if (!createdUserID || createdUserID === "") {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    const { user, error: getUserError } = await UserService.getUserById(createdUserID);
    if (getUserError) {
      return res.status(500).json({ msg: getUserError });
    }
    if (!user) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    return res.status(201).json(user);
  }

  static async loginUser(req: Request, res: Response): Promise<Response> {
    const payload = new UserLogin(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : 'Parâmetros invalidos e/ou vazios';
      return res.status(400).json({ msg: errorMessage });
    }

    const { user, error: getUserError } = await UserService.getUserByEmail(payload.email);
    if (getUserError) {
      return res.status(500).json({ msg: getUserError });
    }
    if (!user) {
      return res.status(401).json({ msg: 'Credenciais de usuário inválidas' });
    }

    const isPasswordValid = await Password.comparePassword(payload.pwd, user.pwd);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Credenciais de usuário inválidas' });
    }

    const token = Token.generateToken(user.id);

    return res.status(200).json({
      id: user.id,
      email: user.email,
      access_token: token,
    });
  }

  static async updateUserMe(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!validarUUID(userId)) {
      return res.status(400).json({ msg: 'ID do usuário inválido' });
    }

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (getUserError) {
      return res.status(500).json({ msg: getUserError });
    }
    if (!user) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    const payload = new UserUpdate(req.body);

    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : 'Parâmetros inválidos e/ou vazios';
      return res.status(400).json({ msg: errorMessage });
    }

    if (payload.email !== user.email) {
      const { user: existingUser, error: getUserEmailError } = await UserService.getUserByEmail(payload.email);
      if (getUserEmailError) {
        return res.status(500).json({ msg: getUserEmailError });
      }
      if (existingUser) {
        return res.status(400).json({ msg: 'Email já cadastrado no sistema' });
      }
    }

    const updatedUserData = {
      novoNome: payload.name || user.name,
      novoEmail: payload.email || user.email,
      novaSenha: await Password.hashPassword(payload.pwd || user.pwd),
      novaPixKey: payload.pix_key || user.pix_key,
      novaPixKeyType: payload.pix_key_type || user.pix_key_type
    };

    const { updatedUser, error: updateUserError } = await UserService.updateUser(userId, updatedUserData);
    if (updateUserError) {
      return res.status(500).json({ msg: updateUserError });
    }
    return res.status(200).json(updatedUser);
  }

  static async deleteUserMe(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!validarUUID(userId)) {
      return res.status(400).json({ msg: 'ID do usuário inválido' });
    }

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (getUserError) {
      return res.status(500).json({ msg: getUserError });
    }
    if (!user) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    const { deletedUser, error: deletedUserError } = await UserService.deleteUser(userId);
    if (deletedUserError) {
      return res.status(500).json({ msg: deletedUserError });
    }
    return res.status(200).json({ msg: 'Excluído com sucesso' });
  }

  static async requestRecover(req: Request, res: Response): Promise<Response> {
    const payload = new UserRequestRecover(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : 'Parâmetros inválidos e/ou vazios';
      return res.status(400).json({ msg: errorMessage });
    }

    const { user, error: userError } = await UserService.getUserByEmail(payload.email);
    if (userError) {
      return res.status(500).json({ msg: userError });
    }
    if (!user) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    const codeRecoverPwd = await generateRandomCode(6);

    const { requestUser, error: requestRecoverError } = await UserService.requestRecover(user.id, codeRecoverPwd);
    if (requestRecoverError) {
      return res.status(500).json({ msg: requestRecoverError });
    }

    const emailOptions: EmailOptions = {
      to: user.email,
      subject: 'Solicitação de recuperação de senha',
      html: TemplateEmail.requestRecover(requestUser),
    };

    sendEmail(emailOptions);

    return res.status(200).json({ msg: 'Email de solicitação enviado com sucesso' });
  }

  static async recoverPwd(req: Request, res: Response): Promise<Response> {
    const payload = new UserRecoverPwd(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : 'Parâmetros inválidos e/ou vazios';
      return res.status(400).json({ msg: errorMessage });
    }

    const { user, error: userError } = await UserService.getUserByEmail(payload.email);
    if (userError) {
      return res.status(500).json({ msg: userError });
    }
    if (!user) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    if (user.code_recover_pwd !== payload.code_recover_pwd) {
      return res.status(400).json({ msg: 'Código de recuperação inválido' });
    }

    const newPwd = await Password.hashPassword(payload.pwd || user.pwd);

    const { recoverUser, error: recoverPwdError } = await UserService.recoverPwd(user.id, newPwd);
    if (recoverPwdError) {
      return res.status(500).json({ msg: recoverPwdError });
    }
    return res.status(200).json(recoverUser);
  }
}
