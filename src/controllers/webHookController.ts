import { Request, Response } from 'express';

declare module 'net' {
    interface Socket {
        authorized?: boolean;
    }
}

export class WebHookController {
    static async webHookConfiguration(req: Request, res: Response): Promise<Response> {
        if (req.socket.authorized) {
            return res.status(200).end();
        } else {
            return res.status(401).end();
        }
    }

    static async pixPayConfirm(req: Request, res: Response): Promise<Response> {
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

            return res.status(200).end();
        } else {
            return res.status(401).end();
        }
    }
}