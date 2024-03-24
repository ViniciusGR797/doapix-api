import { IsString, IsEmail, Matches, ValidateNested, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class User {
  @IsString({ message: 'O campo id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo id é obrigatório' })
  id: string;

  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString({ message: 'O campo pwd é obrigatório' })
  @IsNotEmpty({ message: 'O campo pwd é obrigatório' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Senha fraca. A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@ $ ! % * ? &)',
  })
  pwd: string;

  @IsString({ message: 'O campo pix_key deve ser uma string' })
  @Matches(/^(?:\d{11}|\d{14}|\d{10,11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})$/, {
    message: 'Chave Pix inválido. A pix_key deve ser um CPF, CNPJ, Número de telefone, Email ou Chave aleatória',
  })
  pix_key: string;

  @IsString({ message: 'O campo created_at deve ser uma string' })
  @IsNotEmpty({ message: 'O campo created_at é obrigatório' })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message: 'Data de criação inválido. A created_at deve ser uma data no formato ISO 8601, como “2024-03-24T04:42:34.208Z”',
  })
  created_at: string;

  constructor(payload: User) {
    this.id = typeof payload.id === 'string' ? payload.id.trim() : payload.id;
    this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
    this.pix_key = typeof payload.pix_key === 'string' ? payload.pix_key.trim() : payload.pix_key;
    this.created_at = typeof payload.created_at === 'string' ? payload.created_at.trim() : payload.created_at;
  }
}

class UserUpdate {
  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString({ message: 'O campo pwd é obrigatório' })
  @IsNotEmpty({ message: 'O campo pwd é obrigatório' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Senha fraca. A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@ $ ! % * ? &)',
  })
  pwd: string;

  @IsString({ message: 'O campo pix key deve ser uma string' })
  @IsNotEmpty({ message: 'O campo pix key é obrigatório' })
  @Matches(/^(?:\d{11}|\d{14}|\d{10,11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})$/, {
    message: 'Pix key inválido. A pix key deve ser um CPF, CNPJ, Número de telefone, Email ou Chave aleatória',
  })
  pix_key: string;

  constructor(payload: UserUpdate) {
    this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
    this.pix_key = typeof payload.pix_key === 'string' ? payload.pix_key.trim() : payload.pix_key;
  }
}

class UserInsert {
  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString({ message: 'O campo pwd é obrigatório' })
  @IsNotEmpty({ message: 'O campo pwd é obrigatório' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Senha fraca. A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@ $ ! % * ? &)',
  })
  pwd: string;

  constructor(payload: UserInsert) {
    this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
  }
}

class UserLogin {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString({ message: 'O campo pwd é obrigatório' })
  @IsNotEmpty({ message: 'O campo pwd é obrigatório' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Senha fraca. A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@ $ ! % * ? &)',
  })
  pwd: string;

  constructor(payload: UserLogin) {
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
  }
}

export { User, UserUpdate, UserInsert, UserLogin };