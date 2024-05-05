import { Request, Response } from 'express';
import config from '../config';
import { TransactionService } from '../services/transactionServices';
import { refundPix, sendPix } from '../utils/pix';
import { DonationService } from '../services/donationServices';
import { UserService } from '../services/userService';
import { generatePixShippingId, generateRefundId } from '../securities/generateId';
import pusher from '../utils/pusher';
import { query } from "../utils/database"

declare module 'net' {
    interface Socket {
        authorized?: boolean;
    }
}

export class WebHookController {
    static async webHookConfiguration(req: Request, res: Response): Promise<Response> {
        const userId = req.headers['user-id'];

        const hasPermission = WebHookController.verifyUserPermission(userId);
        if (!hasPermission) {
            return res.status(403).json({ msg: "Não tem permissão para acessar o recurso solicitado" });
        }

        if (!req.socket.authorized) {
            return res.status(401).json({ msg: "Requisição sem certificado" });
        }

        const result = await query(
            'INSERT INTO logs (level, message) VALUES ($1, $2) RETURNING id', 
            ["DEBUG-CONFIG", "CHAMOU CONFIG"]
        );

        const result2 = await query(
            'INSERT INTO logs (level, message) VALUES ($1, $2) RETURNING id', 
            ["DEBUG-CONFIG", req.body]
        );

        console.log(req.body);

        return res.status(200).json({ msg: "Webhook configurado com sucesso" });
    }

    static async pixPayConfirm(req: Request, res: Response): Promise<Response> {
        try {
            // const userId = req.headers['user-id'];

            // const hasPermission = WebHookController.verifyUserPermission(userId);
            // if (!hasPermission) {
            //     return res.status(403).json({ msg: "Não tem permissão para acessar o recurso solicitado" });
            // }

            // if (!req.socket.authorized) {
            //     return res.status(401).json({ msg: "Requisição sem certificado" });
            // }

            const result = await query(
                'INSERT INTO logs (level, message) VALUES ($1, $2) RETURNING id', 
                ["DEBUG-PIX", "CHAMOU PIX"]
            );

            const result2 = await query(
                'INSERT INTO logs (level, message) VALUES ($1, $2) RETURNING id', 
                ["DEBUG-PIX", req.body]
            );

            console.log(req.body);

            const { txid, e2eId, amount, transaction, donation, user } = await WebHookController.processPaymentConfirmation(req.body);

            await WebHookController.notifyPayment(txid);

            await WebHookController.updateTransactionStatus(transaction.id);

            // Requer ser CNPJ
            // await WebHookController.processPixPayment(amount, e2eId, donation, transaction, user);

            return res.status(200).json({ msg: "Confirmação de pagamento Pix recebida com sucesso" });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    static verifyUserPermission(userId: any): boolean {
        return userId !== null && userId !== undefined && userId === config.webHookUserId;
    }

    static async processPaymentConfirmation(payload: any): Promise<{ txid: string; e2eId: string; amount: string; transaction: any; donation: any; user: any }> {
        const txid = payload.pix[0].txid;
        const e2eId = payload.pix[0].endToEndId;
        const amount = (Math.ceil(payload.pix[0].valor * 93.62) / 100).toFixed(2);

        const { transaction, error: gettransactionError } = await TransactionService.getTransactionByTxid(txid);
        if (gettransactionError) {
            throw new Error(gettransactionError);
        }
        if (!transaction) {
            throw new Error('Nenhuma transação encontrada');
        }

        const { donation, error: getDonationError } = await DonationService.getDonationById(transaction.donation_id);
        if (getDonationError) {
            throw new Error(getDonationError);
        }
        if (!donation) {
            throw new Error('Nenhum dado de doação encontrado');
        }

        const { user, error: getUserError } = await UserService.getUserById(donation.user_id);
        if (getUserError) {
            throw new Error(getUserError);
        }
        if (!user) {
            throw new Error('Nenhum dado de usuário encontrado');
        }

        return { txid, e2eId, amount, transaction, donation, user };
    }

    static async notifyPayment(txid: string): Promise<void> {
        pusher.trigger('payment-notification-channel', 'payment', {
            message: 'Pagamento realizado com sucesso',
            txid: txid
        });
    }

    static async updateTransactionStatus(transactionId: string): Promise<void> {
        const { updatedTransaction, error: updateUserError } = await TransactionService.updateTransaction(transactionId, "Pago");
        if (updateUserError) {
            throw new Error(updateUserError);
        }
        if (!updatedTransaction) {
            throw new Error('Erro ao atualizar transação');
        }
    }

    static async processPixPayment(amount: string, e2eId: string, transaction: any, donation: any, user: any): Promise<void> {
        const idEnvio = generatePixShippingId(transaction.loc_id, donation.id, user.id);

        const pix = await sendPix(amount, donation.name, transaction.alias, user.pix_key, idEnvio);
        if (!pix) {
            await this.processPixRefund(e2eId, transaction, donation, user);
            throw new Error('Erro ao enviar Pix');
        } else if (pix.status === 401) {
            await this.processPixRefund(e2eId, transaction, donation, user);
            throw new Error(`Erro: ${pix.data.error_description}`);
        } else if (pix.status !== 201) {
            await this.processPixRefund(e2eId, transaction, donation, user);
            throw new Error(`Erro: ${pix.data.mensagem}`);
        }
    }

    static async processPixRefund(e2eId: string, transaction: any, donation: any, user: any): Promise<void> {
        const refund_id = generateRefundId(e2eId, transaction.loc_id, donation.id, user.id);

        const refund = await refundPix(e2eId, refund_id);
        if (!refund) {
            throw new Error('Erro ao enviar Pix');
        } else if (refund.status === 401) {
            throw new Error(`Erro: ${refund.data.error_description}`);
        } else if (refund.status !== 201) {
            throw new Error(`Erro: ${refund.data.mensagem}`);
        }
    }
}