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
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com base nos dados fornecidos no corpo da requisição.
 *     tags:
 *       - User
 *     operationId: create_user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserInsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.post('/', WebHookController.webHookConfiguration);

router.post('/pix', WebHookController.pixPayConfirm);

export default router;