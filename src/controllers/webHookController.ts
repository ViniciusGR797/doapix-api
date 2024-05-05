import { Request, Response } from 'express';
import config from '../config';
import { WebsocketService } from '../services/websocketServices';
import { TransactionService } from '../services/transactionServices';
import { io } from '../app';
import { refundPix, sendPix } from '../utils/pix';
import { DonationService } from '../services/donationServices';
import { UserService } from '../services/userService';
import { generatePixShippingId, generateRefundId } from '../securities/generateId';

declare module 'net' {
    interface Socket {
        authorized?: boolean;
    }
}

export class WebHookController {
    static async webHookConfiguration(req: Request, res: Response): Promise<Response> {
        const userId = req.headers['user-id'];
        if (userId == null || userId != config.pix.webHookUserId) {
            return res.status(403).json({ msg: "Não tem permissão para acessar o recurso solicitado" });
        }

        if (req.socket.authorized) {
            return res.status(200).json({ msg: "Webhook configurado com sucesso" });
        } else {
            return res.status(401).json({ msg: "Requisição sem certificado" });
        }
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
        return userId !== null && userId !== undefined && userId === config.pix.webHookUserId;
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
        const { websocketConnections, error: getwebsocketConnectionError } = await WebsocketService.getWebsocketConnectionsByTxid(txid);
        if (getwebsocketConnectionError) {
            throw new Error(getwebsocketConnectionError);
        }
        if (!websocketConnections) {
            throw new Error('Nenhuma conexão websocket encontrado');
        }

        websocketConnections.forEach(({ socket_id }) => {
            const clientSocket = io.sockets.sockets.get(socket_id);
            if (clientSocket) {
                clientSocket.emit('payment', 'Pagamento realizado com sucesso');
            }
        });

        await WebsocketService.deleteWebsocketConnectionsByTxid(txid);

        const { deletedWebsocketConnections, error: deletedWebsocketConnectionError } = await WebsocketService.deleteWebsocketConnectionsByTxid(txid);
        if (deletedWebsocketConnectionError) {
            throw new Error(deletedWebsocketConnectionError);
        }
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