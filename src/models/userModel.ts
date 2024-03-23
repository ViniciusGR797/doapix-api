import { IsString, IsEmail, Matches, ValidateNested, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class User {
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

  constructor(payload: User) {
    this.name = typeof payload.name === 'string' ? payload.name.trim() : payload.name;
    this.email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email;
    this.pwd = typeof payload.pwd === 'string' ? payload.pwd.trim() : payload.pwd;
  }
}

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