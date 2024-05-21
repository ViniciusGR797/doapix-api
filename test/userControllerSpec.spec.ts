import { Request, Response } from 'express';
import { UserController } from '../src/controllers/userController';
import { UserService } from '../src/services/userService';
import { Password } from '../src/securities/password';
import { Token } from '../src/securities/token';

jest.mock('../src/services/userService');
jest.mock('../src/securities/password');
jest.mock('../src/securities/token');

describe('UserController', () => {
    describe('getUserMe', () => {
        it('should return user when successful', async () => {
            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockUser = { id: mockUserId, name: 'John Doe', email: 'john@example.com' };
            const mockRequest = { user_id: mockUserId } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

            await UserController.getUserMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return error message when failed to get user', async () => {
            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockError = 'Failed to get user';
            const mockRequest = { user_id: mockUserId } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: null, error: mockError });

            await UserController.getUserMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
        });

        it('should return "Nenhum usuário encontrado" when user is not found', async () => {
            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockRequest = { user_id: mockUserId } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.getUserMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Nenhum usuário encontrado' });
        });
    });

    describe('createUser', () => {
        it('should create user when successful', async () => {
            const mockUserPayload = { name: 'John Doe', email: 'john@example.com', pwd: '1234Aa@2' };
            const mockUser = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', ...mockUserPayload };
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (UserService.createUser as jest.Mock).mockResolvedValue({ createdUserID: mockUser.id, error: null });
            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

            await UserController.createUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return error message when failed to validate user payload', async () => {
            const mockUserPayload = {};
            const mockError = 'O campo name é obrigatório';
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (UserService.createUser as jest.Mock).mockResolvedValue({ createdUserID: null, error: mockError });

            await UserController.createUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
        });

        it('should return error message when user email already exists', async () => {
            const mockUserPayload = { name: 'John Doe', email: 'john@example.com', pwd: '1234Aa@2' };
            const mockExistingUser = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', ...mockUserPayload };
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockExistingUser, error: null });

            await UserController.createUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Este email já está cadastrado' });
        });

        it('should return error message when failed to create user', async () => {
            const mockUserPayload = { name: 'John Doe', email: 'john@example.com', pwd: '1234Aa@2' };
            const mockUser = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', ...mockUserPayload };
            const mockError = 'Failed to create user';
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (UserService.createUser as jest.Mock).mockResolvedValue({ createdUserID: null, error: mockError });

            await UserController.createUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
        });
    });

    describe('loginUser', () => {
        it('should login user when successful', async () => {
            const mockUserPayload = { email: 'john@example.com', pwd: '1234Aa@2' };
            const mockUser = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', ...mockUserPayload };
            const mockToken = 'token';
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (Password.comparePassword as jest.Mock).mockResolvedValue(true);
            (Token.generateToken as jest.Mock).mockReturnValue(mockToken);

            await UserController.loginUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                id: mockUser.id,
                email: mockUser.email,
                access_token: mockToken,
            });
        });

        it('should return error message when failed to validate user payload', async () => {
            const mockUserPayload = {};
            const mockError = 'O campo email é obrigatório';
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.loginUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
        });

        it('should return error message when user is not found', async () => {
            const mockUserPayload = { email: 'john@example.com', pwd: '1234Aa@2' };
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });

            await UserController.loginUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Credenciais de usuário inválidas' });
        });

        it('should return error message when password is invalid', async () => {
            const mockUserPayload = { email: 'john@example.com', pwd: '1234Aa@2' };
            const mockUser = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', ...mockUserPayload };
            const mockRequest = { body: mockUserPayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (Password.comparePassword as jest.Mock).mockResolvedValue(false);

            await UserController.loginUser(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Credenciais de usuário inválidas' });
        });
    });

    describe('updateUserMe', () => {
        it('should update user when successful', async () => {
            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockUser = { id: mockUserId, name: 'John Doe', email: 'john@example.com' };
            const mockUserUpdatePayload = {
                name: 'Teste',
                email: 'teste2@gmail.com',
                pwd: '1234Aa@2',
                pix_key: '38605734035',
                pix_key_type: 'CPF'
            };
            const mockUpdatedUser = {
                id: mockUserId,
                name: 'Teste',
                email: 'teste2@gmail.com',
                pix_key: '38605734035',
                pix_key_type: 'CPF'
            };
            const mockRequest = { user_id: mockUserId, body: mockUserUpdatePayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (UserService.updateUser as jest.Mock).mockResolvedValue({ updatedUser: mockUpdatedUser, error: null });

            await UserController.updateUserMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedUser);
        });

        it('should return error message when failed to validate user update payload', async () => {
            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockUserUpdatePayload = {};
            const mockUser = { id: mockUserId, name: 'John Doe', email: 'john@example.com' };
            const mockError = 'O campo name é obrigatório';
            const mockRequest = { user_id: mockUserId, body: mockUserUpdatePayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

            await UserController.updateUserMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
        });

        it('should return error message when user email already exists', async () => {
            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockUser = { id: mockUserId, name: 'John Doe', email: 'john@example.com' };
            const mockUserUpdatePayload = {
                name: 'Teste',
                email: 'teste2@gmail.com',
                pwd: '1234Aa@2',
                pix_key: '38605734035',
                pix_key_type: 'CPF'
            };
            const mockExistingUser = {
                id: '30f58ca1-bba7-4a38-bd3f-c59ea06511dc',
                ...mockUserUpdatePayload
            };
            const mockRequest = { user_id: mockUserId, body: mockUserUpdatePayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: mockExistingUser, error: null });

            await UserController.updateUserMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Email já cadastrado no sistema' });
        });

        it('should return error message when failed to update user', async () => {
            const mockUserId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
            const mockUser = { id: mockUserId, name: 'John Doe', email: 'john@example.com' };
            const mockUserUpdatePayload = {
                name: 'Teste',
                email: 'teste2@gmail.com',
                pwd: '1234Aa@2',
                pix_key: '38605734035',
                pix_key_type: 'CPF'
            };
            const mockError = 'Failed to update user';
            const mockRequest = { user_id: mockUserId, body: mockUserUpdatePayload } as unknown as Request;
            const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: mockUser, error: null });
            (Password.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (UserService.getUserByEmail as jest.Mock).mockResolvedValue({ user: null, error: null });
            (UserService.updateUser as jest.Mock).mockResolvedValue({ updatedUser: null, error: mockError });

            await UserController.updateUserMe(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
        });
    });

    describe('deleteUserMe', () => {
        it('should return 400 if user ID is invalid', async () => {
            const req = { user_id: 'invalid_id' } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            await UserController.deleteUserMe(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
        });

        it('should return 500 if there is an error getting the user', async () => {
            const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ error: 'Error getting user' });

            await UserController.deleteUserMe(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Error getting user' });
        });

        it('should return 404 if user is not found', async () => {
            const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: null });

            await UserController.deleteUserMe(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
        });

        it('should return 500 if there is an error deleting the user', async () => {
            const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } });
            (UserService.deleteUser as jest.Mock).mockResolvedValue({ error: 'Error deleting user' });

            await UserController.deleteUserMe(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Error deleting user' });
        });

        it('should return 200 if user is deleted successfully', async () => {
            const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (UserService.getUserById as jest.Mock).mockResolvedValue({ user: { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } });
            (UserService.deleteUser as jest.Mock).mockResolvedValue({ deletedUser: { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } });

            await UserController.deleteUserMe(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Excluído com sucesso' });
        });
    });
});