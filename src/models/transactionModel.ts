import { IsString, IsEmail, Matches, IsNotEmpty, IsInt } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Transaction"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - id
 *         - txid
 *         - loc_id
 *         - location
 *         - qr_code
 *         - pix_copy_paste
 *         - amount
 *         - alias
 *         - email
 *         - message
 *         - status
 *         - created_at
 *         - donation_id
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único da transação
 *           example: "f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca"
 *         txid:
 *           type: string
 *           description: Identificador único atribuído uma transação feita com uma criptomoeda na rede blockchain
 *           example: "7978c0c97ea847e78e8849634473c1f1"
 *         loc_id:
 *           type: number
 *           description: Identificador único associado a location
 *           example: 10
 *         location:
 *           type: string
 *           description: Identificador único associado a uma cobrança imediata no sistema de pagamentos instantâneos Pix, responsável por gerar o QR Code correspondente à cobrança
 *           example: "pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25"
 *         qr_code:
 *           type: string
 *           description: Imagem base64 do QR Code para realizar o pagamento
 *           example: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmc vMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NSA0NSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMCAwaDQ1djQ1SD"
 *         pix_copy_paste:
 *           type: string
 *           description: String permite realizar pagamentos sem a necessidade de escanear um QR Code
 *           example: "00020101021226830014BR.GOV.BCB.PIX2561qrcodespix.sejaefi.com.br/v2/41e0badf811a4ce6ad8a80b306821fce5204000053000065802BR5905EFISA6008SAOPAULO60070503***61040000"
 *         amount:
 *           type: string
 *           description: Valor da transação
 *           example: "$2,000.00"
 *         alias:
 *           type: string
 *           description: Apelido do doador (opcional)
 *           example: "João Teixeira"
 *         email:
 *           type: string
 *           description: Email do doador
 *           example: "email@example.com"
 *         message:
 *           type: string
 *           description: Mensagem solidária do doador
 *           example: "🤝 Fiz uma contribuição. Espero que ajude a fazer a diferença!"
 *         status:
 *           type: string
 *           description: Status da transação
 *           example: "Pago"
 *         created_at:
 *           type: string
 *           description: Data de criação da transação
 *           example: "2024-03-24T19:34:02.090Z"
 *         donation_id:
 *           type: string
 *           description: Identificador único da transação da campanha de doação
 *           example: "fa763c0d-21ad-4151-bd14-00962d3c3a74"
 */

class Transaction {
    @IsString({ message: 'O campo id deve ser uma string' })
    @IsNotEmpty({ message: 'O campo id é obrigatório' })
    id: string;

    @IsString({ message: 'O campo txid deve ser uma string' })
    @IsNotEmpty({ message: 'O campo txid é obrigatório' })
    txid: string;

    @IsInt({ message: 'O campo loc_id deve ser uma inteiro' })
    @IsNotEmpty({ message: 'O campo loc_id é obrigatório' })
    loc_id: number;

    @IsString({ message: 'O campo location deve ser uma string' })
    @IsNotEmpty({ message: 'O campo location é obrigatório' })
    location: string;

    @IsString({ message: 'O campo qr_code deve ser uma string' })
    @IsNotEmpty({ message: 'O campo qr_code é obrigatório' })
    qr_code: string;

    @IsString({ message: 'O campo pix_copy_paste deve ser uma string' })
    @IsNotEmpty({ message: 'O campo pix_copy_paste é obrigatório' })
    pix_copy_paste: string;

    @IsString({ message: 'O campo amount deve ser uma string' })
    @IsNotEmpty({ message: 'O campo amount é obrigatório' })
    amount: string;

    @IsString({ message: 'O campo alias deve ser uma string' })
    alias: string;

    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'O campo email é obrigatório' })
    email: string;

    @IsString({ message: 'O campo message deve ser uma string' })
    message: string;

    @IsString({ message: 'O campo status deve ser uma string' })
    @IsNotEmpty({ message: 'O campo status é obrigatório' })
    status: string;

    @IsString({ message: 'O campo created_at deve ser uma string' })
    @IsNotEmpty({ message: 'O campo created_at é obrigatório' })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'Data de criação inválido. A created_at deve ser uma data no formato ISO 8601, como “2024-03-24T04:42:34.208Z”',
    })
    created_at: string;

    @IsString({ message: 'O campo donation_id deve ser uma string' })
    @IsNotEmpty({ message: 'O campo donation_id é obrigatório' })
    donation_id: string;

    constructor(payload: Transaction) {
        this.id = typeof payload.id === 'string' ? payload.id.trim() : payload.id;
        this.txid = typeof payload.txid === 'string' ? payload.txid.trim() : payload.txid;
        this.loc_id = typeof payload.loc_id === 'number' ? payload.loc_id : 0;
        this.location = typeof payload.location === 'string' ? payload.location.trim() : payload.location;
        this.qr_code = typeof payload.qr_code === 'string' ? payload.qr_code.trim() : payload.qr_code;
        this.pix_copy_paste = typeof payload.pix_copy_paste === 'string' ? payload.pix_copy_paste.trim() : payload.pix_copy_paste;
        this.amount = typeof payload.amount === 'string' ? payload.amount.trim() : payload.amount;
        this.alias = typeof payload.alias === 'string' ? payload.alias.trim() : payload.alias;
        this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
        this.message = typeof payload.message === 'string' ? payload.message.trim() : payload.message;
        this.status = typeof payload.status === 'string' ? payload.status.trim() : payload.status;
        this.created_at = typeof payload.created_at === 'string' ? payload.created_at.trim() : payload.created_at;
        this.donation_id = typeof payload.donation_id === 'string' ? payload.donation_id.trim() : payload.donation_id;
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionUpdate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           description: Status da transação
 *           example: "Aguardando pagamento"
 */

class TransactionUpdate {
    @IsString({ message: 'O campo status deve ser uma string' })
    @IsNotEmpty({ message: 'O campo status é obrigatório' })
    status: string;

    constructor(payload: TransactionUpdate) {
        this.status = typeof payload.status === 'string' ? payload.status.trim() : payload.status;
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionInsert:
 *       type: object
 *       required:
 *         - amount
 *         - alias
 *         - email
 *         - message
 *         - donation_id
 *       properties:
 *         amount:
 *           type: string
 *           description: Valor da transação
 *           example: "$2,000.00"
 *         alias:
 *           type: string
 *           description: Apelido do doador (opcional)
 *           example: "Maria Souza"
 *         email:
 *           type: string
 *           description: Email do doador
 *           example: "maria@example.com"
 *         message:
 *           type: string
 *           description: Mensagem solidária do doador
 *           example: "💕 Doei para apoiar a sua missão. Vamos mudar o mundo juntos!"
 *         donation_id:
 *           type: string
 *           description: Identificador único da transação da campanha solidária
 *           example: "49a3d66e-f2b9-487c-b47d-38b2f732424a"
 */

class TransactionInsert {
    @IsString({ message: 'O campo amount deve ser uma string' })
    @IsNotEmpty({ message: 'O campo amount é obrigatório' })
    amount: string;

    @IsString({ message: 'O campo alias deve ser uma string' })
    @IsNotEmpty({ message: 'O campo alias é obrigatório' })
    alias: string;

    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'O campo email é obrigatório' })
    email: string;

    @IsString({ message: 'O campo message deve ser uma string' })
    message: string;

    @IsString({ message: 'O campo donation_id deve ser uma string' })
    @IsNotEmpty({ message: 'O campo donation_id é obrigatório' })
    donation_id: string;

    constructor(payload: Transaction) {
        this.amount = typeof payload.amount === 'string' ? payload.amount.trim() : payload.amount;
        this.alias = typeof payload.alias === 'string' ? payload.alias.trim() : payload.alias;
        this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
        this.message = typeof payload.message === 'string' ? payload.message.trim() : payload.message;
        this.donation_id = typeof payload.donation_id === 'string' ? payload.donation_id.trim() : payload.donation_id;
    }
}

export { Transaction, TransactionUpdate, TransactionInsert };
