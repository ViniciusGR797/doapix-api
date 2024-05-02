import { Request, Response } from 'express';
import config from '../config';

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
        const userId = req.headers['user-id'];
        if (userId == null || userId != config.pix.webHookUserId) {
            return res.status(403).json({ msg: "Não tem permissão para acessar o recurso solicitado" });
        }

        if (req.socket.authorized) {

            // const txid = req.body.pix[0].txid;
            // const clientList = clients.get(txid);
            // if (clientList) {
            //     for (const client of clientList) {
            //         client.emit('payment', 'Pagamento realizado');
            //     }
            //     clients.delete(txid); // Remove clients after sending message
            // }

            // Atualiza status para "Pago" no banco de dados

            return res.status(200).json({ msg: "Confirmação de pagamento Pix recebida com sucesso" });
        } else {
            return res.status(401).json({ msg: "Requisição sem certificado" });
        }
    }
}