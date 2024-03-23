import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionServices';
import { Password } from '../securities/password';
import { Token } from '../securities/token';
import { Transaction } from '../models/transactionModel';

export class TransactionController {
  static async getTransactionByDonation(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("transaction");
  }

  static async getTransactionById(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("transaction");
  }

  static async createTransaction(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ access_token: "token" });
  }
}
