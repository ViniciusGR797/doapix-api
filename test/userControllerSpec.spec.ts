import { Request, Response } from 'express';
import { UserController } from '../src/controllers/userController';
import { UserService } from '../src/services/userService';
import { Password } from '../src/securities/password';
import { Token } from '../src/securities/token';
import { validate } from 'class-validator';
import { generateRandomCode, sendEmail } from '../src/utils/email';
import { UserInsert, UserUpdate, UserLogin, UserRequestRecover, UserRecoverPwd } from '../src/models/userModel';




jest.mock('../src/services/userService');
jest.mock('../src/securities/password');
jest.mock('../src/securities/token');
jest.mock('class-validator');
jest.mock('../src/utils/email');


describe('userController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserMe', () => {
        it('should return a user if valid user_id is provided', async () => {

            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockUser = { id: mockUserId, name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' };

            const mockRequest = {
                params: { user_id: mockUserId },
            } as unknown as Request;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

            await UserController.getUserMe(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(mockUser);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return 400 if user_id is invalid', async () => {
            const mockUserId = 'invalid-uuid';
            const mockRequest = {
                params: { user_id: mockUserId },
            } as unknown as Request;

            await UserController.getUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
        });

        it('should return 404 if no user is found', async () => {
            const mockUserId = '1';

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.getUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum usuário encontrado' });
        });

        it('should return 500 on service error', async () => {
            const mockUserId = '1';
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: null, error: 'Erro interno do servidor' });

            const mockRequest = {
                params: { user_id: mockUserId },
            } as unknown as Request;

            await UserController.getUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
        });
    });

    describe('createUser', () => {
        it('should create a user and return it', async () => {
            const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' };
            req.body = { name: 'John Doe', email: 'john@example.com', pwd: 'password' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('hashedpassword');
            (UserService.createUser as jest.Mock).mockResolvedValue({ createdUserID: '1', error: null });
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

            await UserController.createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 400 if validation fails', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', pwd: 'password' };
            const mockValidationError = [{ constraints: { isEmail: 'email must be an email' } }];
            (validate as jest.Mock).mockResolvedValue(mockValidationError);

            await UserController.createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'email must be an email' });
        });

        it('should return 400 if email is already registered', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', pwd: 'password' };
            const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

            await UserController.createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Este email já está cadastrado' });
        });

        it('should return 500 on service error', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', pwd: 'password' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('hashedpassword');
            (UserService.createUser as jest.Mock).mockResolvedValue({ createdUserID: null, error: 'Erro interno do servidor' });

            await UserController.createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
        });
    });

    describe('loginUser', () => {
        it('should return a token if login is successful', async () => {
            const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' };
            req.body = { email: 'john@example.com', pwd: 'password' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (Password.comparePassword as jest.Mock).mockResolvedValue(true);
            (Token.generateToken as jest.Mock).mockReturnValue('generatedToken');

            await UserController.loginUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                id: mockUser.id,
                email: mockUser.email,
                access_token: 'generatedToken',
            });
        });

        it('should return 400 if validation fails', async () => {
            req.body = { email: 'john@example.com', pwd: 'password' };
            const mockValidationError = [{ constraints: { isEmail: 'email must be an email' } }];
            (validate as jest.Mock).mockResolvedValue(mockValidationError);

            await UserController.loginUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'email must be an email' });
        });

        it('should return 401 if credentials are invalid', async () => {
            req.body = { email: 'john@example.com', pwd: 'password' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.loginUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Credenciais de usuário inválidas' });
        });

        it('should return 500 on service error', async () => {
            req.body = { email: 'john@example.com', pwd: 'password' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: 'Erro interno do servidor' });

            await UserController.loginUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
        });
    });

    describe('updateUserMe', () => {
        it('should update a user and return it', async () => {
            const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' };
            const mockUserId = '1';
            req.body = { name: 'John Updated', email: 'johnupdated@example.com', pwd: 'newpassword' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('newhashedpassword');
            (UserService.updateUser as jest.Mock).mockResolvedValue({ updatedUser: { ...mockUser, name: 'John Updated', email: 'johnupdated@example.com', pwd: 'newhashedpassword' }, error: null });

            await UserController.updateUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ ...mockUser, name: 'John Updated', email: 'johnupdated@example.com', pwd: 'newhashedpassword' });
        });

        it('should return 400 if user_id is invalid', async () => {
            const mockUserId = 'invalid-uuid';

            await UserController.updateUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
        });

        it('should return 400 if validation fails', async () => {
            const mockUserId = '1';
            req.body = { name: 'John Updated', email: 'invalid-email', pwd: 'newpassword' };
            const mockValidationError = [{ constraints: { isEmail: 'email must be an email' } }];
            (validate as jest.Mock).mockResolvedValue(mockValidationError);
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: { id: '1', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' }, error: null });

            await UserController.updateUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'email must be an email' });
        });

        it('should return 404 if no user is found', async () => {
            const mockUserId = '1';
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.updateUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
        });

        it('should return 500 on service error', async () => {
            const mockUserId = '1';
            req.body = { name: 'John Updated', email: 'johnupdated@example.com', pwd: 'newpassword' };
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: { id: '1', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' }, error: null });
            (UserService.updateUser as jest.Mock).mockResolvedValue({ updatedUser: null, error: 'Erro interno do servidor' });

            await UserController.updateUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
        });
    });

    describe('deleteUserMe', () => {
        it('should delete a user and return success message', async () => {
            const mockUserId = '1';
            const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' };
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (UserService.deleteUser as jest.Mock).mockResolvedValue({ deletedUser: mockUser, error: null });

            await UserController.deleteUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Excluído com sucesso' });
        });

        it('should return 400 if user_id is invalid', async () => {
            const mockUserId = 'invalid-uuid';

            await UserController.deleteUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
        });

        it('should return 404 if no user is found', async () => {
            const mockUserId = '1';
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.deleteUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
        });

        it('should return 500 on service error', async () => {
            const mockUserId = '1';

            const mockRequest = {
                params: { user_id: mockUserId },
            } as unknown as Request;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'John Doe', email: 'john@example.com', pwd: 'hashedpassword' }, error: null });
            (UserService.deleteUser as jest.Mock).mockResolvedValue({ deletedUser: null, error: 'Erro interno do servidor' });

            await UserController.deleteUserMe(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
        });
    });

    describe('requestRecover', () => {
        it('should send recovery email if user exists', async () => {
            const mockUser = { id: '1', email: 'john@example.com', code_recover_pwd: null };
            req.body = { email: 'john@example.com' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (generateRandomCode as jest.Mock).mockResolvedValue('123456');
            (UserService.requestRecover as jest.Mock).mockResolvedValue({ requestUser: mockUser, error: null });

            await UserController.requestRecover(req as Request, res as Response);

            expect(sendEmail).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Email de solicitação enviado com sucesso' });
        });

        it('should return 400 if validation fails', async () => {
            req.body = { email: 'invalid-email' };
            const mockValidationError = [{ constraints: { isEmail: 'email must be an email' } }];
            (validate as jest.Mock).mockResolvedValue(mockValidationError);

            await UserController.requestRecover(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'email must be an email' });
        });

        it('should return 404 if no user is found', async () => {
            req.body = { email: 'john@example.com' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.requestRecover(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
        });

        it('should return 500 on service error', async () => {
            req.body = { email: 'john@example.com' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: 'Erro interno do servidor' });

            await UserController.requestRecover(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
        });
    });

    describe('recoverPwd', () => {
        it('should update password if code is valid', async () => {
            const mockUser = { id: '1', email: 'john@example.com', code_recover_pwd: '123456', pwd: 'oldhashedpassword' };
            req.body = { email: 'john@example.com', code_recover_pwd: '123456', pwd: 'newpassword' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('newhashedpassword');
            (UserService.recoverPwd as jest.Mock).mockResolvedValue({ recoverUser: { ...mockUser, pwd: 'newhashedpassword' }, error: null });

            await UserController.recoverPwd(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ ...mockUser, pwd: 'newhashedpassword' });
        });

        it('should return 400 if validation fails', async () => {
            req.body = { email: 'invalid-email', code_recover_pwd: '123456', pwd: 'newpassword' };
            const mockValidationError = [{ constraints: { isEmail: 'email must be an email' } }];
            (validate as jest.Mock).mockResolvedValue(mockValidationError);

            await UserController.recoverPwd(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'email must be an email' });
        });

        it('should return 404 if no user is found', async () => {
            req.body = { email: 'john@example.com', code_recover_pwd: '123456', pwd: 'newpassword' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.recoverPwd(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
        });

        it('should return 400 if recovery code is invalid', async () => {
            const mockUser = { id: '1', email: 'john@example.com', code_recover_pwd: '654321', pwd: 'oldhashedpassword' };
            req.body = { email: 'john@example.com', code_recover_pwd: '123456', pwd: 'newpassword' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

            await UserController.recoverPwd(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Código de recuperação inválido' });
        });

        it('should return 500 on service error', async () => {
            req.body = { email: 'john@example.com', code_recover_pwd: '123456', pwd: 'newpassword' };
            (validate as jest.Mock).mockResolvedValue([]);
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: { id: '1', email: 'john@example.com', code_recover_pwd: '123456', pwd: 'oldhashedpassword' }, error: null });
            (UserService.recoverPwd as jest.Mock).mockResolvedValue({ recoverUser: null, error: 'Erro interno do servidor' });

            await UserController.recoverPwd(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
        });
    });
});
