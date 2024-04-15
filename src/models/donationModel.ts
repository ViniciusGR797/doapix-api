import { IsNotEmpty, IsString, Matches } from "class-validator";

class Donation {
    @IsString({ message: 'O campo id deve ser uma string' })
    @IsNotEmpty({ message: 'O campo id é obrigatório' })
    id: string;
  
    @IsString({ message: 'O campo name deve ser uma string' })
    @IsNotEmpty({ message: 'O campo name é obrigatório' })
    name: string;
  
    @IsString({ message: 'O campo description deve ser uma string' })
    @IsNotEmpty({ message: 'O campo description é obrigatório' })
    description: string;

    @IsString({ message: 'O campo goal deve ser uma string' })
    @IsNotEmpty({ message: 'O campo goal é obrigatório' })
    goal: string;

    @IsString({ message: 'O campo amount_raised deve ser uma string' })
    @IsNotEmpty({ message: 'O campo amount_raised é obrigatório' })
    amount_raised: string;

    @IsNotEmpty({ message: 'O campo imagem é obrigatório' })
    url_image: string;

    @IsString({ message: 'O campo deadline deve ser uma string' })
    @IsNotEmpty({ message: 'O campo deadline é obrigatório' })
    deadline: string;

    @IsString({ message: 'O campo created_at deve ser uma string' })
    @IsNotEmpty({ message: 'O campo created_at é obrigatório' })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
      message: 'Data de criação inválido. A created_at deve ser uma data no formato ISO 8601, como “2024-03-24T04:42:34.208Z”',
    })
    created_at: string;

    @IsString({ message: 'O campo state deve ser uma string' })
    @IsNotEmpty({ message: 'O campo state é obrigatório' })
    state: string;

    @IsString({ message: 'O campo category deve ser uma string' })
    @IsNotEmpty({ message: 'O campo category é obrigatório' })
    category: string;

    @IsString({ message: 'O campo user_id deve ser uma string' })
    @IsNotEmpty({ message: 'O campo user_id é obrigatório' })
    user_id: string;

    constructor(payload: Donation) {
        this.id = typeof payload.id === 'string' ? payload.id.trim() : payload.id;
        this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
        this.description = typeof payload.description === 'string' ? payload.description.trim().toLowerCase() : payload.description;
        this.goal = typeof payload.goal === 'string' ? payload.goal.trim() : payload.goal;
        this.amount_raised = typeof payload.amount_raised === 'string' ? payload.amount_raised.trim() : payload.amount_raised;
        this.url_image = typeof payload.url_image === 'string' ? payload.url_image.trim() : payload.url_image;
        this.deadline = typeof payload.deadline === 'string' ? payload.deadline.trim() : payload.deadline;
        this.created_at = typeof payload.created_at === 'string' ? payload.created_at.trim() : payload.created_at;
        this.state = typeof payload.state === 'string' ? payload.state.trim() : payload.state;
        this.category = typeof payload.category === 'string' ? payload.category.trim() : payload.category;
        this.user_id = typeof payload.user_id === 'string' ? payload.user_id.trim() : payload.user_id;
      }
}

class DonationUpdate{
    @IsString({ message: 'O campo name deve ser uma string' })
    @IsNotEmpty({ message: 'O campo name é obrigatório' })
    name: string;

    @IsString({ message: 'O campo goal deve ser uma string' })
    @IsNotEmpty({ message: 'O campo goal é obrigatório' })
    goal: string;

    @IsNotEmpty({ message: 'O campo imagem é obrigatório' })
    url_image: string;

    @IsString({ message: 'O campo deadline deve ser uma string' })
    @IsNotEmpty({ message: 'O campo deadline é obrigatório' })
    deadline: string;

    @IsString({ message: 'O campo state deve ser uma string' })
    @IsNotEmpty({ message: 'O campo state é obrigatório' })
    state: string;

    @IsString({ message: 'O campo category deve ser uma string' })
    @IsNotEmpty({ message: 'O campo category é obrigatório' })
    category: string;

    @IsString({ message: 'O campo description deve ser uma string' })
    @IsNotEmpty({ message: 'O campo description é obrigatório' })
    description: string;

    constructor(payload: DonationUpdate) {
        this.name  = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
        this.description = typeof payload.description === 'string' ? payload.description.trim() : payload.description;
        this.goal = typeof payload.goal === 'string' ? payload.goal.trim() : payload.goal;
        this.url_image = typeof payload.url_image === 'string' ? payload.url_image.trim() : payload.url_image;
        this.deadline = typeof payload.deadline === 'string' ? payload.deadline.trim() : payload.deadline;
        this.state = typeof payload.state === 'string' ? payload.state.trim() : payload.state;
        this.category = typeof payload.category === 'string' ? payload.category.trim() : payload.category;
    }
}

class DonationInsert{
    @IsString({ message: 'O campo name deve ser uma string' })
    @IsNotEmpty({ message: 'O campo name é obrigatório' })
    name: string;

    @IsString({ message: 'O campo goal deve ser uma string' })
    @IsNotEmpty({ message: 'O campo goal é obrigatório' })
    goal: string;

    @IsNotEmpty({ message: 'O campo imagem é obrigatório' })
    url_image: string;

    @IsString({ message: 'O campo deadline deve ser uma string' })
    @IsNotEmpty({ message: 'O campo deadline é obrigatório' })
    deadline: string;

    @IsString({ message: 'O campo state deve ser uma string' })
    @IsNotEmpty({ message: 'O campo state é obrigatório' })
    state: string;

    @IsString({ message: 'O campo category deve ser uma string' })
    @IsNotEmpty({ message: 'O campo category é obrigatório' })
    category: string;

    @IsString({ message: 'O campo description deve ser uma string' })
    @IsNotEmpty({ message: 'O campo description é obrigatório' })
    description: string;

    constructor(payload: DonationInsert) {
        this.name  = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
        this.description = typeof payload.description === 'string' ? payload.description.trim() : payload.description;
        this.goal = typeof payload.goal === 'string' ? payload.goal.trim() : payload.goal;
        this.url_image = typeof payload.url_image === 'string' ? payload.url_image.trim() : payload.url_image;
        this.deadline = typeof payload.deadline === 'string' ? payload.deadline.trim() : payload.deadline;
        this.state = typeof payload.state === 'string' ? payload.state.trim() : payload.state;
        this.category = typeof payload.category === 'string' ? payload.category.trim() : payload.category;
    }
}

export { Donation, DonationInsert, DonationUpdate };
