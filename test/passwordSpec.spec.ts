import bcrypt from 'bcryptjs';
import { Password } from '../src/securities/password'; // Substitua 'sua-classe' pelo caminho do seu arquivo

jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe('Testes para Password', () => {
    describe('Testes para hashPassword', () => {
        it('Deve chamar bcrypt.hash com a senha e o número de salt rounds', async () => {
            const password = 'senha123';

            await Password.hashPassword(password);

            expect(bcrypt.hash).toHaveBeenCalledWith(password, expect.any(Number));
            expect(bcrypt.hash).toHaveBeenCalledTimes(1);
        });
    });

    describe('Testes para comparePassword', () => {
        it('Deve chamar bcrypt.compare com a senha e a senha criptografada', async () => {
            const password = 'senha123';
            const hashedPassword = '$2a$10$examplehashedpassword';

            await Password.comparePassword(password, hashedPassword);

            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
            expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        });
    });
});