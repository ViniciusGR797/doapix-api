import { IsNotEmpty, IsString, Matches } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     DonationList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Donation"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DonationDetails:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - url_image
 *         - description
 *         - state
 *         - category
 *         - goal
 *         - amount_raised
 *         - deadline
 *         - created_at
 *         - user_id
 *         - transactions
 *         - comments
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único da campanha de doação
 *           example: "fa763c0d-21ad-4151-bd14-00962d3c3a74"
 *         name:
 *           type: string
 *           description: Nome da campanha de doação
 *           example: "Doe Amor e Esperança"
 *         url_image:
 *           type: string
 *           description: URL da imagem da campanha de doação (formato base64)
 *           example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBURDw8REREPDw8PDxEPEA8PEREPDw8PGBQZGRgUGBgcIS4lHB4sHxkYJjgnLTU0NjU1GiQ7QDszQC40Nz8BDAwMEA8QHBISGDQhJSExNDQxMTE0NDExNDQ1NDE0NDQ0NDQ0NDQxNDE0MTE0NDQ0NDQ0NDQ0MTQxNDE0NDQ3NP/AABEIAJwBRAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBQYHBP/EAEsQAAIBAwIDBAYGBQkECwAAAAECAAMEEQUSBiExE0FRYQcUIjJxgUJSYnKRshcjM6GxFVNUdIKSlKLT"
 *         description:
 *           type: string
 *           description: Descrição da campanha de doação
 *           example: "Buscamos arrecadar fundos e itens essenciais para apoiar famílias carentes. As doações podem ser feitas pessoalmente ou por transferência bancária. Sua contribuição pode fazer a diferença!"
 *         state:
 *           type: string
 *           description: Sigla dos estados do Brasil (Unidades federativas do Brasil), onde se localiza essa campanha de doação
 *           example: "PR"
 *         category:
 *           type: string
 *           description: Categoria que se encaixa essa campanha de doação
 *           example: "Projetos Sociais / Voluntariado"
 *         goal:
 *           type: string
 *           description: Meta de arrecadação monetária da campanha de doação
 *           example: "$500.00"
 *         amount_raised:
 *           type: string
 *           description: Valor monetária já arrecadado na campanha de doação
 *           example: "$100.00"
 *         deadline:
 *           type: string
 *           description: Data limite da campanha de doação, sendo fechada após esse período
 *           example: "2024-04-24T19:34:02.090Z"
 *         created_at:
 *           type: string
 *           description: Data de criação da campanha de doação
 *           example: "2024-03-24T19:34:02.090Z"
 *         user_id:
 *           type: string
 *           description: Usuário que criou essa campanha de doação
 *           example: "f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca"
 *         transactions_count:
 *           type: integer
 *           description: Quantidade de doações pagas nessa campanha
 *           example: 15
 *         comments:
 *           type: array
 *           description: Lista de comentários solidários dos doadores
 *           items:
 *             type: object
 *             properties:
 *               alias:
 *                 type: string
 *                 description: Apelido do doador (opcional)
 *                 example: "João Teixeira"
 *               message:
 *                 type: string
 *                 description: Mensagem solidária do doador
 *                 example: "🤝 Fiz uma contribuição. Espero que ajude a fazer a diferença!"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - url_image
 *         - description
 *         - state
 *         - category
 *         - goal
 *         - amount_raised
 *         - deadline
 *         - created_at
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único da campanha de doação
 *           example: "fa763c0d-21ad-4151-bd14-00962d3c3a74"
 *         name:
 *           type: string
 *           description: Nome da campanha de doação
 *           example: "Doe Amor e Esperança"
 *         url_image:
 *           type: string
 *           description: URL da imagem da campanha de doação (formato base64)
 *           example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBURDw8REREPDw8PDxEPEA8PEREPDw8PGBQZGRgUGBgcIS4lHB4sHxkYJjgnLTU0NjU1GiQ7QDszQC40Nz8BDAwMEA8QHBISGDQhJSExNDQxMTE0NDExNDQ1NDE0NDQ0NDQ0NDQxNDE0MTE0NDQ0NDQ0NDQ0MTQxNDE0NDQ3NP/AABEIAJwBRAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBQYHBP/EAEsQAAIBAwIDBAYGBQkECwAAAAECAAMEEQUSBiExE0FRYQcUIjJxgUJSYnKRshcjM6GxFVNUdIKSlKLT"
 *         description:
 *           type: string
 *           description: Descrição da campanha de doação
 *           example: "Buscamos arrecadar fundos e itens essenciais para apoiar famílias carentes. As doações podem ser feitas pessoalmente ou por transferência bancária. Sua contribuição pode fazer a diferença!"
 *         state:
 *           type: string
 *           description: Sigla dos estados do Brasil (Unidades federativas do Brasil), onde se localiza essa campanha de doação
 *           example: "PR"
 *         category:
 *           type: string
 *           description: Categoria que se encaixa essa campanha de doação
 *           example: "Projetos Sociais / Voluntariado"
 *         goal:
 *           type: string
 *           description: Meta de arrecadação monetária da campanha de doação
 *           example: "$500.00"
 *         amount_raised:
 *           type: string
 *           description: Valor monetária já arrecadado na campanha de doação
 *           example: "$100.00"
 *         deadline:
 *           type: string
 *           description: Data limite da campanha de doação, sendo fechada após esse período
 *           example: "2024-04-24T19:34:02.090Z"
 *         created_at:
 *           type: string
 *           description: Data de criação da campanha de doação
 *           example: "2024-03-24T19:34:02.090Z"
 *         user_id:
 *           type: string
 *           description: Usuário que criou essa campanha de doação
 *           example: "f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca"
 */

class Donation {
    @IsString({ message: 'O campo id deve ser uma string' })
    @IsNotEmpty({ message: 'O campo id é obrigatório' })
    id: string;

    @IsString({ message: 'O campo name deve ser uma string' })
    @IsNotEmpty({ message: 'O campo name é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'O campo imagem é obrigatório' })
    url_image: string;

    @IsString({ message: 'O campo description deve ser uma string' })
    @IsNotEmpty({ message: 'O campo description é obrigatório' })
    description: string;

    @IsString({ message: 'O campo state deve ser uma string' })
    @IsNotEmpty({ message: 'O campo state é obrigatório' })
    state: string;

    @IsString({ message: 'O campo category deve ser uma string' })
    @IsNotEmpty({ message: 'O campo category é obrigatório' })
    category: string;

    @IsString({ message: 'O campo goal deve ser uma string' })
    @IsNotEmpty({ message: 'O campo goal é obrigatório' })
    goal: string;

    @IsString({ message: 'O campo amount_raised deve ser uma string' })
    @IsNotEmpty({ message: 'O campo amount_raised é obrigatório' })
    amount_raised: string;

    @IsString({ message: 'O campo deadline deve ser uma string' })
    @IsNotEmpty({ message: 'O campo deadline é obrigatório' })
    deadline: string;

    @IsString({ message: 'O campo created_at deve ser uma string' })
    @IsNotEmpty({ message: 'O campo created_at é obrigatório' })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'Data de criação inválido. A created_at deve ser uma data no formato ISO 8601, como “2024-03-24T04:42:34.208Z”',
    })
    created_at: string;

    @IsString({ message: 'O campo user_id deve ser uma string' })
    @IsNotEmpty({ message: 'O campo user_id é obrigatório' })
    user_id: string;

    constructor(payload: Donation) {
        this.id = typeof payload.id === 'string' ? payload.id.trim() : payload.id;
        this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
        this.url_image = typeof payload.url_image === 'string' ? payload.url_image.trim() : payload.url_image;
        this.description = typeof payload.description === 'string' ? payload.description.trim().toLowerCase() : payload.description;
        this.state = typeof payload.state === 'string' ? payload.state.trim() : payload.state;
        this.category = typeof payload.category === 'string' ? payload.category.trim() : payload.category;
        this.goal = typeof payload.goal === 'string' ? payload.goal.trim() : payload.goal;
        this.amount_raised = typeof payload.amount_raised === 'string' ? payload.amount_raised.trim() : payload.amount_raised;
        this.deadline = typeof payload.deadline === 'string' ? payload.deadline.trim() : payload.deadline;
        this.created_at = typeof payload.created_at === 'string' ? payload.created_at.trim() : payload.created_at;
        this.user_id = typeof payload.user_id === 'string' ? payload.user_id.trim() : payload.user_id;
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     DonationUpdate:
 *       type: object
 *       required:
 *         - name
 *         - url_image
 *         - description
 *         - state
 *         - category
 *         - goal
 *         - deadline
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da campanha de doação
 *           example: "Doe Amor e Esperança"
 *         url_image:
 *           type: string
 *           description: URL da imagem da campanha de doação (formato base64)
 *           example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBURDw8REREPDw8PDxEPEA8PEREPDw8PGBQZGRgUGBgcIS4lHB4sHxkYJjgnLTU0NjU1GiQ7QDszQC40Nz8BDAwMEA8QHBISGDQhJSExNDQxMTE0NDExNDQ1NDE0NDQ0NDQ0NDQxNDE0MTE0NDQ0NDQ0NDQ0MTQxNDE0NDQ3NP/AABEIAJwBRAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBQYHBP/EAEsQAAIBAwIDBAYGBQkECwAAAAECAAMEEQUSBiExE0FRYQcUIjJxgUJSYnKRshcjM6GxFVNUdIKSlKLT"
 *         description:
 *           type: string
 *           description: Descrição da campanha de doação
 *           example: "Buscamos arrecadar fundos e itens essenciais para apoiar famílias carentes. As doações podem ser feitas pessoalmente ou por transferência bancária. Sua contribuição pode fazer a diferença!"
 *         state:
 *           type: string
 *           description: Sigla dos estados do Brasil (Unidades federativas do Brasil), onde se localiza essa campanha de doação
 *           example: "PR"
 *         category:
 *           type: string
 *           description: Categoria que se encaixa essa campanha de doação
 *           example: "Projetos Sociais / Voluntariado"
 *         goal:
 *           type: string
 *           description: Meta de arrecadação monetária da campanha de doação
 *           example: "$500.00"
 *         deadline:
 *           type: string
 *           description: Data limite da campanha de doação, sendo fechada após esse período
 *           example: "2024-04-24T19:34:02.090Z"
 */

class DonationUpdate {
    @IsString({ message: 'O campo name deve ser uma string' })
    @IsNotEmpty({ message: 'O campo name é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'O campo imagem é obrigatório' })
    url_image: string;

    @IsString({ message: 'O campo description deve ser uma string' })
    @IsNotEmpty({ message: 'O campo description é obrigatório' })
    description: string;

    @IsString({ message: 'O campo state deve ser uma string' })
    @IsNotEmpty({ message: 'O campo state é obrigatório' })
    state: string;

    @IsString({ message: 'O campo category deve ser uma string' })
    @IsNotEmpty({ message: 'O campo category é obrigatório' })
    category: string;

    @IsString({ message: 'O campo goal deve ser uma string' })
    @IsNotEmpty({ message: 'O campo goal é obrigatório' })
    goal: string;

    @IsString({ message: 'O campo deadline deve ser uma string' })
    @IsNotEmpty({ message: 'O campo deadline é obrigatório' })
    deadline: string;

    constructor(payload: DonationUpdate) {
        this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
        this.url_image = typeof payload.url_image === 'string' ? payload.url_image.trim() : payload.url_image;
        this.description = typeof payload.description === 'string' ? payload.description.trim() : payload.description;
        this.state = typeof payload.state === 'string' ? payload.state.trim() : payload.state;
        this.category = typeof payload.category === 'string' ? payload.category.trim() : payload.category;
        this.goal = typeof payload.goal === 'string' ? payload.goal.trim() : payload.goal;
        this.deadline = typeof payload.deadline === 'string' ? payload.deadline.trim() : payload.deadline;
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     DonationInsert:
 *       type: object
 *       required:
 *         - name
 *         - url_image
 *         - description
 *         - state
 *         - category
 *         - goal
 *         - deadline
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da campanha de doação
 *           example: "Doe Amor e Esperança"
 *         url_image:
 *           type: string
 *           description: URL da imagem da campanha de doação (formato base64)
 *           example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBURDw8REREPDw8PDxEPEA8PEREPDw8PGBQZGRgUGBgcIS4lHB4sHxkYJjgnLTU0NjU1GiQ7QDszQC40Nz8BDAwMEA8QHBISGDQhJSExNDQxMTE0NDExNDQ1NDE0NDQ0NDQ0NDQxNDE0MTE0NDQ0NDQ0NDQ0MTQxNDE0NDQ3NP/AABEIAJwBRAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBQYHBP/EAEsQAAIBAwIDBAYGBQkECwAAAAECAAMEEQUSBiExE0FRYQcUIjJxgUJSYnKRshcjM6GxFVNUdIKSlKLT"
 *         description:
 *           type: string
 *           description: Descrição da campanha de doação
 *           example: "Buscamos arrecadar fundos e itens essenciais para apoiar famílias carentes. As doações podem ser feitas pessoalmente ou por transferência bancária. Sua contribuição pode fazer a diferença!"
 *         state:
 *           type: string
 *           description: Sigla dos estados do Brasil (Unidades federativas do Brasil), onde se localiza essa campanha de doação
 *           example: "PR"
 *         category:
 *           type: string
 *           description: Categoria que se encaixa essa campanha de doação
 *           example: "Projetos Sociais / Voluntariado"
 *         goal:
 *           type: string
 *           description: Meta de arrecadação monetária da campanha de doação
 *           example: "$500.00"
 *         deadline:
 *           type: string
 *           description: Data limite da campanha de doação, sendo fechada após esse período
 *           example: "2024-04-24T19:34:02.090Z"
 */

class DonationInsert {
    @IsString({ message: 'O campo name deve ser uma string' })
    @IsNotEmpty({ message: 'O campo name é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'O campo imagem é obrigatório' })
    url_image: string;

    @IsString({ message: 'O campo description deve ser uma string' })
    @IsNotEmpty({ message: 'O campo description é obrigatório' })
    description: string;

    @IsString({ message: 'O campo state deve ser uma string' })
    @IsNotEmpty({ message: 'O campo state é obrigatório' })
    state: string;

    @IsString({ message: 'O campo category deve ser uma string' })
    @IsNotEmpty({ message: 'O campo category é obrigatório' })
    category: string;

    @IsString({ message: 'O campo goal deve ser uma string' })
    @IsNotEmpty({ message: 'O campo goal é obrigatório' })
    goal: string;

    @IsString({ message: 'O campo deadline deve ser uma string' })
    @IsNotEmpty({ message: 'O campo deadline é obrigatório' })
    deadline: string;

    constructor(payload: DonationInsert) {
        this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
        this.url_image = typeof payload.url_image === 'string' ? payload.url_image.trim() : payload.url_image;
        this.description = typeof payload.description === 'string' ? payload.description.trim() : payload.description;
        this.state = typeof payload.state === 'string' ? payload.state.trim() : payload.state;
        this.category = typeof payload.category === 'string' ? payload.category.trim() : payload.category;
        this.goal = typeof payload.goal === 'string' ? payload.goal.trim() : payload.goal;
        this.deadline = typeof payload.deadline === 'string' ? payload.deadline.trim() : payload.deadline;
    }
}

export { Donation, DonationUpdate, DonationInsert };
