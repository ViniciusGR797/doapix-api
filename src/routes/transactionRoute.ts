import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Rotas para manipulação de transações solidárias
 */

/**
 * @swagger
 * /transactions/donation/{donation_id}:
 *   parameters:
 *     - name: donation_id
 *       in: path
 *       required: true
 *       description: ID da campanha de doação que será obtido as transações
 *       schema:
 *         type: string
 *   get:
 *     summary: Vizualiza todas transações solidárias de uma campanha de doação
 *     description: Retorna as informações de todas transações solidárias de uma campanha de doação
 *     tags:
 *       - Transaction
 *     operationId: get_all_transaction_by_donation
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TransactionList"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/donation/:donation_id', authMiddleware, TransactionController.getTransactionByDonation);

/**
 * @swagger
 * /transactions/{transaction_id}:
 *   parameters:
 *     - name: transaction_id
 *       in: path
 *       required: true
 *       description: ID da transação solidária que será visualizada
 *       schema:
 *         type: string
 *   get:
 *     summary: Vizualiza transação solidária pelo id
 *     description: Retorna as informações de transação solidária pelo id
 *     tags:
 *       - Transaction
 *     operationId: get_transaction_by_id
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
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

router.get('/:transaction_id', TransactionController.getTransactionById);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Cria uma nova transação solidária
 *     description: Cria uma nova transação solidária com base nos dados fornecidos no corpo da requisição
 *     tags:
 *       - Transaction
 *     operationId: create_transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TransactionInsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
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

router.post('/', TransactionController.createTransaction);

export default router;