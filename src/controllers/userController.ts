import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Password } from '../securities/password';
import { Token } from '../securities/token';
import { UserUpdate, UserInsert, User, UserLogin } from '../models/userModel';
import { validate } from 'class-validator';

export class UserController {
  static async getUserMe(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("user");
  }

  static async createUser(req: Request, res: Response): Promise<Response> {
    let payload = new UserInsert(req.body);

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
      return res.status(400).json({ msg: "Este e-mail já está cadastrado" });
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
    try{
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
      console.log("TOKEN: " + token);

      return res.status(200).json({ 
        access_token: token,
        id: user.id,
        name: user.name,
        email: user.email,
       });
    }catch(err){
      console.error('Erro ao criar usuário:', err);
      return res.status(500).json({ msg: 'Erro interno do servidor' });
    }
  }

  static async updateUserMe(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("updatedUser");
  }

  static async deleteUserMe(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ msg: 'Excluído com sucesso' });
  }
}
