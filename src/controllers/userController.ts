import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Password } from '../securities/password';
import { Token } from '../securities/token';
import { UserUpsert, User, UserLogin } from '../models/userModel';

export class UserController {
  static async getUserMe(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("user");
  }

  static async createUser(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("user");
  }

  static async loginUser(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ access_token: "token" });
  }

  static async updateUserMe(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("updatedUser");
  }

  static async deleteUserMe(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ msg: 'Excluído com sucesso' });
  }
}
