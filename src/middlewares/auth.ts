import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { Token } from '../securities/token';

// Estendendo a interface Request para incluir a propriedade userId
declare global {
  namespace Express {
    interface Request {
      user_id: string;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'O token JWT não foi fornecido ou é inválido' });
  }

  try {
    // Verifica o token e obtém o ID do usuário, se o token for válido
    const user_id = await Token.verifyToken(token);

    if (typeof user_id !== 'string' || !ObjectId.isValid(user_id) || !user_id) {
      return res.status(403).json({ msg: 'Não tem permissão para acessar o recurso solicitado' });
    }

    // Armazena o ID do usuário na requisição para uso posterior, se necessário
    req.user_id = user_id;

    // Continua o fluxo da requisição
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}