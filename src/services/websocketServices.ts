import { Websocket } from "../models/websocketModel";
import { query } from "../utils/database";

export class WebsocketService {
    static async getWebsocketConnectionById(id: string): Promise<{ websocketConnection: Websocket | null, error: string | null }> {
        try {
            const result = await query('SELECT * FROM websocket_connections WHERE id = $1', [id]);
            if (result && result.rows && result.rows.length > 0) {
                const websocketConnection = result.rows[0];
                return { websocketConnection, error: null };
            }

            return { websocketConnection: null, error: null };
        } catch (error) {
            console.error('Erro ao buscar conexões websocket por id: ', error);
            return { websocketConnection: null, error: 'Erro interno do servidor' };
        }
    }

    static async getWebsocketConnectionsByTxid(txid: string): Promise<{ websocketConnections: Websocket[] | null, error: string | null }> {
        try {
            const result = await query('SELECT * FROM websocket_connections WHERE txid = $1', [txid]);
            const websocketConnections = result.rows;
            return { websocketConnections, error: null };
        } catch (error) {
            console.error('Erro ao buscar conexões websocket por txid: ', error);
            return { websocketConnections: null, error: 'Erro interno do servidor' };
        }
    }

    static async createWebsocketConnection(data: any): Promise<{ createdWebsocketConnectionID: string | null; error: string | null }> {
        try {
            const { txid, socket_id } = data;

            const result = await query(
                'INSERT INTO websocket_connections (txid, socket_id) VALUES ($1, $2) RETURNING id', [txid, socket_id]
            );
            if (result && result.rows && result.rows.length > 0 && result.rows[0].id) {
                return { createdWebsocketConnectionID: result.rows[0].id, error: null };
            }

            return { createdWebsocketConnectionID: null, error: null };
        } catch (error) {
            console.error('Erro ao criar conexão websocket: ', error);
            return { createdWebsocketConnectionID: '', error: 'Erro interno do servidor' };
        }
    }

    static async deleteWebsocketConnectionsByTxid(txid: string): Promise<{ deletedWebsocketConnections: Websocket[] | null, error: string | null }> {
        try {
            const result = await query('DELETE FROM websocket_connections WHERE txid = $1', [txid]);
            const deletedWebsocketConnections = result.rows;
            return { deletedWebsocketConnections, error: null };
        } catch (error) {
            console.error('Erro ao deletar conexões websocket por txid: ', error);
            return { deletedWebsocketConnections: null, error: 'Erro interno do servidor' };
        }
    }
}
