import { Request, Response } from 'express';
import { DonationService } from '../services/donationServices';
import { Password } from '../securities/password';
import { Token } from '../securities/token';
import { Donation } from '../models/donationModel';

export class DonationController {
  static async getDonation(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("donation");
  }

  static async getDonationById(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("donation");
  }

  static async createDonation(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ access_token: "token" });
  }

  static async updateDonation(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("updatedDonation");
  }

  static async deleteDonation(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ msg: 'Excluído com sucesso' });
  }
}
