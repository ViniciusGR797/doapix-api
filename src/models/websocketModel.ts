import { IsString, IsEmail, Matches, IsNotEmpty, IsIn } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     Websocket:
 *       type: object
 *       required:
 *         - id
 *         - txid
 *         - socket_id
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único do usuário
 *           example: "f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca"
 *         txid:
 *           type: string
 *           description: Identificador único atribuído uma transação feita com uma criptomoeda na rede blockchain
 *           example: "7978c0c97ea847e78e8849634473c1f1"
 *         socket_id:
 *           type: string
 *           description: Identificador único atribuído a conexão websocket
 *           example: "FAKEID1234567890ABCD"
 *         created_at:
 *           type: string
 *           description: Data de criação do usuário
 *           example: "2024-03-24T19:34:02.090Z"
 */

class Websocket {
  @IsString({ message: 'O campo id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo id é obrigatório' })
  id: string;

  @IsString({ message: 'O campo txid deve ser uma string' })
  @IsNotEmpty({ message: 'O campo txid é obrigatório' })
  txid: string;

  @IsString({ message: 'O campo socket_id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo socket_id é obrigatório' })
  socket_id: string;

  @IsString({ message: 'O campo created_at deve ser uma string' })
  @IsNotEmpty({ message: 'O campo created_at é obrigatório' })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message: 'Data de criação inválido. A created_at deve ser uma data no formato ISO 8601, como “2024-03-24T04:42:34.208Z”',
  })
  created_at: string;

  constructor(payload: Websocket) {
    this.id = typeof payload.id === 'string' ? payload.id.trim() : payload.id;
    this.txid = typeof payload.txid === 'string' ? payload.txid.trim() : payload.txid;
    this.socket_id = typeof payload.socket_id === 'string' ? payload.socket_id.trim() : payload.socket_id;
    this.created_at = typeof payload.created_at === 'string' ? payload.created_at.trim() : payload.created_at;
  }
}

export { Websocket };
