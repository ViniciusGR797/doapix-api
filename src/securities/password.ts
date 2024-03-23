import bcrypt from 'bcryptjs';
import config from '../config';

const SALT_ROUNDS = config.saltRounds;

export class Password {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}