/**
 * @swagger
 * components:
 *   schemas:
 *     PixPayConfirmWebhook:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Mensagem de sucesso ao confirmar pagamento Pix recebida
 *           example: "Confirmação de pagamento Pix recebida com sucesso"
 *     ConfigurationSuccessWebhook:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Mensagem de sucesso ao ter validado configuração de segurança do Webhook
 *           example: "Webhook configurado com sucesso"
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
 *         id:
 *           type: string
 *           description: Identificador único do usuário
 *           example: "f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca"
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "email@example.com"
 *         access_token:
 *           type: string
 *           description: Token de acesso do usuário
 *           example: "<token>"
 *     RequestRecoverSuccess:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Mensagem de sucesso solicitar recuperação de senha
 *           example: "Email de solicitação enviado com sucesso"
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
 *     UnauthorizedCertificateWebhook:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Não autorizado. A requisição está sem certificado
 *           example: "Requisição sem certificado"
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
