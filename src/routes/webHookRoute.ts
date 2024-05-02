import { Router } from 'express';
import { WebHookController } from '../controllers/webHookController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: WebHook
 *   description: Rotas de callback
 */

/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Valida configuração de segurança do Webhook
 *     description: Apenas fornecedor de API Pix que consome esse endpoint, para validar configuração de segurança do Webhook
 *     tags:
 *       - WebHook
 *     operationId: webhook_configuration
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ConfigurationSuccessWebhook"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedCertificateWebhook"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 */

router.post('/', WebHookController.webHookConfiguration);

/**
 * @swagger
 * /webhook/pix:
 *   post:
 *     summary: Confirmação de pagamento Pix
 *     description: Apenas fornecedor de API Pix que consome esse endpoint, para enviar confirmação de pagamento Pix
 *     tags:
 *       - WebHook
 *     operationId: pix_pay_confirm
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PixPayConfirmWebhook"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PixPayConfirmWebhook"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedCertificateWebhook"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 */

router.post('/pix', WebHookController.pixPayConfirm);

export default router;