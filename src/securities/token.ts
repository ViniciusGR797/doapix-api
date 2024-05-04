import jwt from 'jsonwebtoken';
import config from '../config';

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
          resolve(null);
        } else {
          resolve(decoded.id);
        }
      });
    });
  }
}