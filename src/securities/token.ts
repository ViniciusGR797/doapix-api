import jwt from 'jsonwebtoken';
import config from '../config';

// Chave secreta para assinar o token
const secretKey = config.jwt.secretKey;

export class Token {
  static generateToken(userId: string): string {
    const expiresIn = config.jwt.accessTokenExpires;

    const payload = {
      id: userId,
    };

    const options: jwt.SignOptions = {
      expiresIn,
    };

    return jwt.sign(payload, secretKey, options);
  }

  static verifyToken(token: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded: any) => {
        if (err) {
          // O token é inválido ou expirou
          resolve(null);
        } else {
          // O token é válido, decodificamos os dados do usuário e retornamos o ID
          resolve(decoded.id);
        }
      });
    });
  }
}