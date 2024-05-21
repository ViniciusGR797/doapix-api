import { generatePixShippingId, generateRefundId } from '../src/securities/generateId';

describe('Testes para generatePixShippingId', () => {
    it('Deve retornar uma string de 35 caracteres', () => {
        const loc_id = 123;
        const donation_id = 'abcd';
        const user_id = 'xyz';

        const result = generatePixShippingId(loc_id, donation_id, user_id);

        expect(result.length).toBe(35);
    });
});

describe('Testes para generateRefundId', () => {
    it('Deve retornar uma string de 35 caracteres', () => {
        const e2eId = '123456';
        const loc_id = 123;
        const donation_id = 'abcd';
        const user_id = 'xyz';

        const result = generateRefundId(e2eId, loc_id, donation_id, user_id);

        expect(result.length).toBe(35);
    });
});
