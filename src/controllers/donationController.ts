import { Request, Response } from 'express';
import { DonationService } from '../services/donationServices';
import { Password } from '../securities/password';
import { Token } from '../securities/token';
import { Donation, DonationInsert, DonationUpdate } from '../models/donationModel';
import { validate } from 'class-validator';

export class DonationController {
  static async getDonation(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("donation");
  }

  static async getDonationById(req: Request, res: Response): Promise<Response> {
    const donationId = req.params.donation_id;

    const { donation, error: getDonationError } = await DonationService.getDonationById(donationId);

    if (getDonationError) {
      return res.status(500).json({ msg: getDonationError });
    }
    if (!donation) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    return res.status(201).json(donation);
  }

  static async createDonation(req: Request, res: Response): Promise<Response> {
    let payload = new DonationInsert(req.body);
    const user_id = req.user_id;

    const errors = await validate(payload);

    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : "Parâmetros inválidos e/ou incompletos";
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdDonationID, error: createDonationError } = await DonationService.createDonation(payload, user_id);
    if (createDonationError) {
      return res.status(500).json({ msg: createDonationError });
    }
    if (!createdDonationID || createdDonationID === "") {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    const { donation, error: getDonationError } = await DonationService.getDonationById(createdDonationID);
    if (getDonationError) {
      return res.status(500).json({ msg: getDonationError });
    }
    if (!donation) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    return res.status(201).json(donation);
  }

  static async updateDonation(req: Request, res: Response): Promise<Response> {
    const donationId = req.params.donation_id;
  
    const { donation, error: getDonationError } = await DonationService.getDonationById(donationId);

    if (getDonationError) {
      return res.status(500).json({ msg: getDonationError });
    }
    if (!donation) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }
  
    const payload = new DonationUpdate(req.body);
  
    const errors = await validate(payload);
    
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : 'Parâmetros inválidos e/ou vazios';
      return res.status(400).json({ msg: errorMessage });
    }
  
    const updatedDonationData = {
      newName: payload.name || donation.name,
      newGoal: payload.goal || donation.goal,
      newDeadline: payload.deadline || donation.deadline,
      newState: payload.state || donation.state,
      newCategory: payload.category || donation.category,
      newDescription: payload.description || donation.description,
      newUrlImage: payload.url_image || donation.url_image
    };
  
    const { updatedDonation, error: updateDonationError } = await DonationService.updateDonation(donationId, updatedDonationData);
    if (updateDonationError) {
      return res.status(500).json({ msg: updateDonationError });
    }
    return res.status(200).json(updatedDonation);
  }

  static async deleteDonation(req: Request, res: Response): Promise<Response> {
    const donationId = req.params.donation_id;

    const { donation, error: getDonationError } = await DonationService.getDonationById(donationId);

    if (getDonationError) {
      return res.status(500).json({ msg: getDonationError });
    }
    if (!donation) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }
  
    const { deletedDonation, error: deletedDonationError } = await DonationService.deleteDonation(donationId);
    if (deletedDonation) {
      return res.status(500).json({ msg: deletedDonationError });
    }
    return res.status(200).json({ msg: 'Excluído com sucesso' });
  }
}
