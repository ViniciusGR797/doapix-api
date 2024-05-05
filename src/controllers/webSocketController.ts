import { WebsocketService } from '../services/websocketServices';

export class WebSocketController {
  static async createWebsocketConnection(txid: string, socket_id: string): Promise<void> {
    const { createdWebsocketConnectionID, error: createUserError } = await WebsocketService.createWebsocketConnection({ txid, socket_id });
    if (createUserError) {
      console.log('Erro ao criar conexão websocket: ', createUserError);
      return;
    }
    if (!createdWebsocketConnectionID || createdWebsocketConnectionID === "") {
      console.log('Nenhum dado encontrado websocket');
      return;
    }

    const { websocketConnection, error: getWebsocketError } = await WebsocketService.getWebsocketConnectionById(createdWebsocketConnectionID);
    if (getWebsocketError) {
      console.log('Erro ao buscar conexão websocket: ', createUserError);
      return;
    }
    if (!websocketConnection) {
      console.log('Nenhum dado encontrado websocket');
      return;
    }
  }
}