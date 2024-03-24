/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteSuccess:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Mensagem de sucesso ao excluir
 *           example: "Excluído com sucesso"
 *     LoginSuccess:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Mensagem de sucesso ao fazer login
 *           example: "<token>"
 *     LoginFail:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Mensagem de falha ao fazer login
 *           example: "Credenciais de usuário inválidas"
 *     BadRequest:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Requisição inválida. Alguns parâmetros podem estar faltando ou serem inválidos
 *           example: "Alguns parâmetros podem estar faltando ou serem inválidos"
 *     Unauthorized:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Não autorizado. O token JWT não foi fornecido ou é inválido
 *           example: "O token JWT não foi fornecido ou é inválido"
 *     Forbidden:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Proibido. O usuário não tem permissão para acessar o recurso solicitado
 *           example: "Não tem permissão para acessar o recurso solicitado"
 *     NotFound:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Nenhum dado encontrado. O recurso solicitado não existe
 *           example: "Nenhum dado encontrado"
 *     InternalServerError:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Erro interno ao manipular dados no serviço
 *           example: "Erro interno do servidor"
 */
