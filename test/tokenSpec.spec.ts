import jwt, { JwtPayload, Secret, VerifyCallback } from 'jsonwebtoken';
import { Token } from '../src/securities/token';
import config from '../src/config';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));

describe('Testes para Token', () => {
    const userId = 'user123';
    const token = 'exampleToken';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Testes para generateToken', () => {
        it('Deve chamar jwt.sign com o payload, a chave secreta e as opções corretas', () => {
            const expiresIn = config.jwt.accessTokenExpires;

            Token.generateToken(userId);

            expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, config.jwt.secretKey, { expiresIn });
            expect(jwt.sign).toHaveBeenCalledTimes(1);
        });

        // Adicione mais testes conforme necessário
    });

    describe('Testes para verifyToken', () => {
        it('Deve chamar jwt.verify com o token e a chave secreta corretos', async () => {
            (jwt.verify as jest.Mock).mockImplementation((token: string, secretKey: Secret, callback: VerifyCallback) => {
                callback(null, { id: userId });
            });

            const resultPromise = Token.verifyToken(token);
            const result = await resultPromise;

            expect(result).toBe(userId);
            expect(jwt.verify).toHaveBeenCalledWith(token, config.jwt.secretKey, expect.any(Function));
            expect(jwt.verify).toHaveBeenCalledTimes(1);
        });

        it('Deve retornar null se jwt.verify retornar um erro', async () => {
            const error: any = new Error('jwt expired');
            error.name = 'TokenExpiredError'; // Simulando um erro de expiração do token
            (jwt.verify as jest.Mock).mockImplementation((token: string, secretKey: Secret, callback: VerifyCallback) => {
                callback(error, undefined);
            });

            const resultPromise = Token.verifyToken(token);
            const result = await resultPromise;

            expect(result).toBeNull();
            expect(jwt.verify).toHaveBeenCalledWith(token, config.jwt.secretKey, expect.any(Function));
            expect(jwt.verify).toHaveBeenCalledTimes(1);
        });

        // Adicione mais testes conforme necessário
    });
});
