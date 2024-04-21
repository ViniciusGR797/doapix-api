import { Router } from 'express';
import { DonationController } from '../controllers/donationController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Donation
 *   description: Rotas para manipulação de campanhas de doação
 */

/**
 * @swagger
 * /donations:
 *   get:
 *     summary: Vizualiza todas campanhas de doação
 *     description: Retorna as informações de todas campanhas de doação
 *     tags:
 *       - Donation
 *     operationId: get_all_donation
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DonationList"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', DonationController.getDonation);

/**
 * @swagger
 * /donations/{donation_id}:
 *   parameters:
 *     - name: donation_id
 *       in: path
 *       required: true
 *       description: ID da campanha de doação que será visualizada
 *       schema:
 *         type: string
 *   get:
 *     summary: Visualiza campanha de doação pelo id
 *     description: Retorna as informações da campanha de doação pelo id
 *     tags:
 *       - Donation
 *     operationId: get_donation_by_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DonationDetails"
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

router.get('/:donation_id', DonationController.getDonationById);

/**
 * @swagger
 * /donations:
 *   post:
 *     summary: Cria uma nova campanha de doação
 *     description: Cria uma nova campanha de doação com base nos dados fornecidos no corpo da requisição
 *     tags:
 *       - Donation
 *     operationId: create_donation
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/DonationInsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Donation"
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

router.post('/', authMiddleware, DonationController.createDonation);

/**
 * @swagger
 * /donations/{donation_id}:
 *   parameters:
 *     - name: donation_id
 *       in: path
 *       required: true
 *       description: ID da campanha de doação que será atualizada
 *       schema:
 *         type: string
 *   put:
 *     summary: Atualiza campanha de doação
 *     description: Atualiza as informações da campanha de doação desejada, desde que o usuário que está realizando a edição seja o mesmo que a criou
 *     tags:
 *       - Donation
 *     operationId: update_donation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/DonationUpdate"
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Donation"
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

router.put('/:donation_id', authMiddleware, DonationController.updateDonation);

/**
 * @swagger
 * /donations/{donation_id}:
 *   parameters:
 *     - name: donation_id
 *       in: path
 *       required: true
 *       description: ID da campanha de doação que será deletada
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove campanha de doação
 *     description: Apaga campanha de doação, desde que o usuário que está realizando a exclusão seja o mesmo que a criou
 *     tags:
 *       - Donation
 *     operationId: delete_donation
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteSuccess"
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

router.delete('/:donation_id', authMiddleware, DonationController.deleteDonation);

export default router;