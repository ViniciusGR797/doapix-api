import { IsString, IsEmail, Matches, ValidateNested, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from "mongodb";
import { Folder } from './folderModel';
import { UserConfig } from './userConfigModel';
import { IsObjectId } from '../utils/validate';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - email
 *         - pwd
 *         - library
 *         - config
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador único do usuário
 *           example: "6123456789abcdef01234567"
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
 *           description: Senha do usuário
 *           example: "senha"
 *         library:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Folder"
 *         config:
 *           $ref: "#/components/schemas/UserConfig"
 */

class User {
  @IsObjectId({ message: 'O campo _id deve ser um ObjectId válido' })
  @IsNotEmpty({ message: 'O campo _id é obrigatório' })
  _id: ObjectId;

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

  @ValidateNested({ each: true })
  @Type(() => Folder)
  @IsNotEmpty({ message: 'O campo library é obrigatório' })
  @ArrayNotEmpty({ message: 'O campo library deve conter pelo menos um elemento' })
  library: Folder[];

  @ValidateNested()
  @Type(() => UserConfig)
  @IsNotEmpty({ message: 'O campo config é obrigatório' })
  config: UserConfig;

  constructor(payload: User) {
    this._id = payload._id;
    this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
    this.library = payload.library;
    this.config = payload.config;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpsert:
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
 *           description: Senha do usuário
 *           example: "senha"
 */

class UserUpsert {
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

  constructor(payload: UserUpsert) {
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
 *           description: Senha do usuário
 *           example: "senha"
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

export { User, UserUpsert, UserLogin };