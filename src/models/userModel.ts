import { IsString, IsEmail, Matches, IsNotEmpty, IsIn } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - pwd
 *         - code_recover_pwd
 *         - pix_key
 *         - pix_key_type
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único do usuário
 *           example: "f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca"
 *         name:
 *           type: string
 *           description: Nome do usuário
 *           example: "Nome do usuário"
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "email@example.com"
 *         pwd:
 *           type: string
 *           description: Senha do usuário com hash
 *           example: "$2a$10$LuXW4dPEXrdz6WIBu4KrjeSyUAYC77g7BpGL1pbQflABIIxwG5/Zm"
 *         code_recover_pwd:
 *           type: string
 *           description: Código de recuperação de senha
 *           example: "123456"
 *         pix_key:
 *           type: string
 *           description: Chave pix
 *           example: "1234abcd-5678-efgh-ijkl-9876mnopqrst"
 *         pix_key_type:
 *           type: string
 *           description: Tipo de chave pix que pode ser CPF, CNPJ, Número de telefone, Email ou Chave aleatória
 *           example: "Aleatória"
 *         created_at:
 *           type: string
 *           description: Data de criação do usuário
 *           example: "2024-03-24T19:34:02.090Z"
 */

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

  @IsString({ message: 'O campo code_recover_pwd deve ser uma string' })
  code_recover_pwd: string;

  @IsString({ message: 'O campo pix_key deve ser uma string' })
  @Matches(/^(?:\d{11}|\d{14}|\d{10,11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})$/, {
    message: 'Chave Pix inválido. A pix_key deve ser um CPF, CNPJ, Número de telefone, Email ou Chave aleatória',
  })
  pix_key: string;

  @IsString({ message: 'O campo pix_key_type deve ser uma string' })
  @IsIn(['CPF', 'CNPJ', 'Email', 'Telefone', 'Aleatória'], {
    message: 'Tipo de Chave Pix inválido. O pix_key_type deve ser um CPF, CNPJ, Email, Telefone ou Aleatória',
  })
  pix_key_type: string;

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
    this.code_recover_pwd = typeof payload.code_recover_pwd === 'string' ? payload.code_recover_pwd.trim() : payload.code_recover_pwd;
    this.pix_key = typeof payload.pix_key === 'string' ? payload.pix_key.trim() : payload.pix_key;
    this.pix_key_type = typeof payload.pix_key_type === 'string' ? payload.pix_key_type.trim() : payload.pix_key_type;
    this.created_at = typeof payload.created_at === 'string' ? payload.created_at.trim() : payload.created_at;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - pwd
 *         - pix_key
 *         - pix_key_type
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *           example: "Nome do usuário"
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "email@example.com"
 *         pwd:
 *           type: string
 *           description: Senha do usuário sem hash
 *           example: "senha123"
 *         pix_key:
 *           type: string
 *           description: Chave pix
 *           example: "1234abcd-5678-efgh-ijkl-9876mnopqrst"
 *         pix_key_type:
 *           type: string
 *           description: Tipo de chave pix que pode ser CPF, CNPJ, Número de telefone, Email ou Chave aleatória
 *           example: "CPF"
 */

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

  @IsString({ message: 'O campo pix_key_type deve ser uma string' })
  @IsIn(['CPF', 'CNPJ', 'Email', 'Telefone', 'Aleatória'], {
    message: 'Tipo de Chave Pix inválido. O pix_key_type deve ser um CPF, CNPJ, Email, Telefone ou Aleatória',
  })
  pix_key_type: string;

  constructor(payload: UserUpdate) {
    this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
    this.pix_key = typeof payload.pix_key === 'string' ? payload.pix_key.trim() : payload.pix_key;
    this.pix_key_type = typeof payload.pix_key_type === 'string' ? payload.pix_key_type.trim() : payload.pix_key_type;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInsert:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - pwd
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *           example: "Nome do usuário"
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "email@example.com"
 *         pwd:
 *           type: string
 *           description: Senha do usuário sem hash
 *           example: "senha123"
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - pwd
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "email@example.com"
 *         pwd:
 *           type: string
 *           description: Senha do usuário sem hash
 *           example: "senha123"
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequestRecover:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "email@example.com"
 */

class UserRequestRecover {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  constructor(payload: UserRequestRecover) {
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRecoverPwd:
 *       type: object
 *       required:
 *         - email
 *         - code_recover_pwd
 *         - pwd
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "email@example.com"
 *         code_recover_pwd:
 *           type: string
 *           description: Código de recuperação de senha
 *           example: "123456"
 *         pwd:
 *           type: string
 *           description: Senha do usuário sem hash
 *           example: "senha123"
 */

class UserRecoverPwd {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString({ message: 'O campo code_recover_pwd deve ser uma string' })
  code_recover_pwd: string;

  @IsString({ message: 'O campo pwd é obrigatório' })
  @IsNotEmpty({ message: 'O campo pwd é obrigatório' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Senha fraca. A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@ $ ! % * ? &)',
  })
  pwd: string;

  constructor(payload: UserRecoverPwd) {
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.code_recover_pwd = typeof payload.code_recover_pwd === 'string' ? payload.code_recover_pwd.trim().toLowerCase() : payload.code_recover_pwd;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
  }
}

export { User, UserUpdate, UserInsert, UserLogin, UserRequestRecover, UserRecoverPwd };