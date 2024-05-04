import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionServices';
import { Transaction, TransactionInsert } from '../models/transactionModel';
import { validate } from 'class-validator';
import { validarUUID } from '../utils/validate';
import { cobGenerator, linkSplitInCob, qrCodeGenerator } from '../utils/pix';
import { DonationService } from '../services/donationServices';
import config from '../config';

export class TransactionController {
  static async getTransactionByDonation(req: Request, res: Response): Promise<Response> {
    const donationId = req.params.donation_id;
    if (!validarUUID(donationId)) {
      return res.status(400).json({ msg: 'ID da donation inválido' });
    }

    const { transactions, error: getTransactionByDonationError } = await TransactionService.getTransactionByDonation(donationId, "Pago");
    if (getTransactionByDonationError) {
      return res.status(500).json({ msg: getTransactionByDonationError });
    }

    return res.status(200).json(transactions);
  }

  static async getTransactionById(req: Request, res: Response): Promise<Response> {
    const transaction_id = req.params.transaction_id;
    if (!validarUUID(transaction_id)) {
      return res.status(400).json({ msg: 'ID da transação inválido' });
    }

    const { transaction, error } = await TransactionService.getTransactionById(transaction_id);
    if (error) {
      return res.status(500).json({ msg: error });
    }
    if (!transaction) {
      return res.status(404).json({ msg: 'Nenhuma transação encontrado' });
    }

    return res.status(200).json(transaction);
  }

  static async createTransaction(req: Request, res: Response): Promise<Response> {
    const payload = new TransactionInsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : "Parâmetros inválidos e/ou incompletos";
      return res.status(400).json({ msg: errorMessage });
    }

    const donationId = payload.donation_id
    if (!validarUUID(donationId)) {
      return res.status(400).json({ msg: 'ID da donation inválido' });
    }

    const { donation, error: getDonationError } = await DonationService.getDonationById(donationId);
    if (getDonationError) {
      return res.status(500).json({ msg: getDonationError });
    }
    if (!donation) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    const cob = await cobGenerator(payload.amount, donation.name)
    if (!cob) {
      return res.status(500).json({ msg: 'Erro ao gerar cobrança imediata em API de Pix' });
    } else if (cob.status === 401) {
      return res.status(400).json({ msg: `Erro: ${cob.data.error_description}` });
    } else if (cob.status !== 201) {
      return res.status(400).json({ msg: `Erro: ${cob.data.mensagem}` });
    }

    const linkSplit = await linkSplitInCob(cob.data.txid, config.pix.splitConfigId)
    if (!linkSplit) {
      return res.status(500).json({ msg: 'Erro ao vincular spli de pagamento em cobrança' });
    } else if (linkSplit.status === 401) {
      return res.status(400).json({ msg: `Erro: ${linkSplit.data.error_description}` });
    } else if (linkSplit.status !== 204) {
      return res.status(400).json({ msg: `Erro: ${linkSplit.data.violacoes[0].razao}` });
    }

    const qrCode = await qrCodeGenerator(cob.data.loc.id)
    if (!qrCode) {
      return res.status(500).json({ msg: 'Erro ao gerar QRCode em API de Pix' });
    } else if (qrCode.status === 401) {
      return res.status(400).json({ msg: `Erro: ${cob.data.error_description}` });
    } else if (qrCode.status !== 200) {
      return res.status(400).json({ msg: `Erro: ${cob.data.mensagem}` });
    }

    const data = new Transaction({
      "id": "",
      "txid": cob.data.txid,
      "loc_id": cob.data.loc.id,
      "location": cob.data.loc.location,
      "qr_code": qrCode.data.imagemQrcode,
      "pix_copy_paste": cob.data.pixCopiaECola,
      "amount": payload.amount,
      "alias": payload.alias,
      "email": payload.email,
      "message": payload.message,
      "status": "Pendente pagamento",
      "created_at": "",
      "donation_id": donationId
    });

    const { createdTransactionID, error: createTransactionError } = await TransactionService.createTransaction(data);
    if (createTransactionError) {
      return res.status(500).json({ msg: createTransactionError });
    }
    if (!createdTransactionID || createdTransactionID === "") {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    const { transaction, error: getTransactionError } = await TransactionService.getTransactionById(createdTransactionID);
    if (getTransactionError) {
      return res.status(500).json({ msg: getTransactionError });
    }
    if (!transaction) {
      return res.status(404).json({ msg: 'Nenhum dado encontrado' });
    }

    return res.status(201).json(transaction);
  }
}
