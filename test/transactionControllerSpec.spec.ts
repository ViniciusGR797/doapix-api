import { Request, Response } from 'express';
import { TransactionController } from '../src/controllers/transactionController';
import { TransactionService } from '../src/services/transactionServices';
import { DonationService } from '../src/services/donationServices';
import { cobGenerator, linkSplitInCob, qrCodeGenerator } from '../src/utils/pix';
import { TransactionInsert } from '../src/models/transactionModel';
import { validate } from 'class-validator';
import { addEmoji } from '../src/utils/emoji';
import config from '../src/config';

jest.mock('../src/services/transactionServices');
jest.mock('../src/services/donationServices');
jest.mock('../src/utils/pix');
jest.mock('../src/utils/emoji');
jest.mock('class-validator');

describe('TransactionController', () => {
  describe('getTransactionByDonation', () => {
    it('should return transactions when successful', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockTransactions = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { donation_id: mockDonationId },
      } as unknown as Request;

      (TransactionService.getTransactionByDonation as jest.Mock).mockResolvedValue({ transactions: mockTransactions, error: null });

      await TransactionController.getTransactionByDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTransactions);
    });

    it('should return error message when failed to get transactions by donation', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockError = 'Failed to get transactions';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { donation_id: mockDonationId },
      } as unknown as Request;

      (TransactionService.getTransactionByDonation as jest.Mock).mockResolvedValue({ transactions: null, error: mockError });

      await TransactionController.getTransactionByDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });

    it('should return "ID da donation inválido" when donation ID is invalid', async () => {
      const mockDonationId = 'invalid-id';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { donation_id: mockDonationId },
      } as unknown as Request;

      await TransactionController.getTransactionByDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID da donation inválido' });
    });
  });

  describe('getTransactionById', () => {
    it('should return transaction details when successful', async () => {
      const mockTransactionId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockTransaction = { id: 1, amount: 100 };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { transaction_id: mockTransactionId },
      } as unknown as Request;

      (TransactionService.getTransactionById as jest.Mock).mockResolvedValue({ transaction: mockTransaction, error: null });

      await TransactionController.getTransactionById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTransaction);
    });

    it('should return error message when failed to get transaction by id', async () => {
      const mockTransactionId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockError = 'Failed to get transaction';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { transaction_id: mockTransactionId },
      } as unknown as Request;

      (TransactionService.getTransactionById as jest.Mock).mockResolvedValue({ transaction: null, error: mockError });

      await TransactionController.getTransactionById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });

    it('should return "Nenhuma transação encontrado" when transaction is not found', async () => {
      const mockTransactionId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { transaction_id: mockTransactionId },
      } as unknown as Request;

      (TransactionService.getTransactionById as jest.Mock).mockResolvedValue({ transaction: null, error: null });

      await TransactionController.getTransactionById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Nenhuma transação encontrado' });
    });

    it('should return "ID da transação inválido" when transaction ID is invalid', async () => {
      const mockTransactionId = 'invalid-id';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { transaction_id: mockTransactionId },
      } as unknown as Request;

      await TransactionController.getTransactionById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID da transação inválido' });
    });
  });

  describe('createTransaction', () => {
    it('should return created transaction when successful', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockQrCode = { status: 200, data: { imagemQrcode: 'qr_code' } };
      const mockCreatedTransactionID = 'created_transaction_id';
      const mockTransaction = { id: 1, amount: 100 };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(mockQrCode);
      (TransactionService.createTransaction as jest.Mock).mockResolvedValue({ createdTransactionID: mockCreatedTransactionID, error: null });
      (TransactionService.getTransactionById as jest.Mock).mockResolvedValue({ transaction: mockTransaction, error: null });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTransaction);
    });

    it('should return error message when failed to validate request payload', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockError = 'Invalid request payload';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([{ constraints: { field: mockError } }]);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });

    it('should return "ID da donation inválido" when donation ID is invalid', async () => {
      const mockRequestPayload = {
        donation_id: 'invalid-id',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: null });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID da donation inválido' });
    });

    it('should return error message when failed to get donation by id', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonationId = mockRequestPayload.donation_id;
      const mockError = 'Failed to get donation';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: mockError });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });

    it('should return "Nenhum dado encontrado" when donation is not found', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonationId = mockRequestPayload.donation_id;
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: null });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });

    it('should return error message when failed to generate cobrança imediata', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockError = 'Failed to generate cobrança imediata';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(null);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Erro ao gerar cobrança imediata em API de Pix' });
    });

    it('should return error message when cobrança imediata status is 401', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 401, data: { error_description: 'Unauthorized' } };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: `Erro: ${mockCob.data.error_description}` });
    });

    it('should return error message when cobrança imediata status is not 201', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 400, data: { mensagem: 'Bad Request' } };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: `Erro: ${mockCob.data.mensagem}` });
    });

    it('should return error message when failed to link split in cobrança', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockError = 'Failed to link split in cobrança';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(null);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Erro ao vincular spli de pagamento em cobrança' });
    });

    it('should return error message when link split in cobrança status is 401', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 401, data: { error_description: 'Unauthorized' } };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: `Erro: ${mockLinkSplit.data.error_description}` });
    });

    it('should return error message when link split in cobrança status is not 204', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 400, data: { violacoes: [{ razao: 'Invalid reason' }] } };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: `Erro: ${mockLinkSplit.data.violacoes[0].razao}` });
    });

    it('should return error message when failed to generate QRCode', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockError = 'Failed to generate QRCode';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(null);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Erro ao gerar QRCode em API de Pix' });
    });

    it('should return error message when QRCode status is 401', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockQrCode = { status: 401, data: { error_description: 'undefined' } };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(mockQrCode);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: `Erro: ${mockQrCode.data.error_description}` });
    });

    it('should return error message when QRCode status is not 200', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockQrCode = { status: 400, data: { mensagem: 'undefined' } };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(mockQrCode);

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: `Erro: ${mockQrCode.data.mensagem}` });
    });

    it('should return error message when failed to create transaction', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockQrCode = { status: 200, data: { imagemQrcode: 'qr_code' } };
      const mockError = 'Failed to create transaction';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(mockQrCode);
      (TransactionService.createTransaction as jest.Mock).mockResolvedValue({ createdTransactionID: null, error: mockError });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });

    it('should return "Nenhum dado encontrado" when created transaction ID is empty', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockQrCode = { status: 200, data: { imagemQrcode: 'qr_code' } };
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(mockQrCode);
      (TransactionService.createTransaction as jest.Mock).mockResolvedValue({ createdTransactionID: '', error: null });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });

    it('should return error message when failed to get created transaction', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockQrCode = { status: 200, data: { imagemQrcode: 'qr_code' } };
      const mockCreatedTransactionID = 'created_transaction_id';
      const mockError = 'Failed to get created transaction';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(mockQrCode);
      (TransactionService.createTransaction as jest.Mock).mockResolvedValue({ createdTransactionID: mockCreatedTransactionID, error: null });
      (TransactionService.getTransactionById as jest.Mock).mockResolvedValue({ transaction: null, error: mockError });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });

    it('should return "Nenhum dado encontrado" when created transaction is not found', async () => {
      const mockRequestPayload = {
        donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc',
        amount: 100,
        alias: 'User 1',
        email: 'user1@example.com',
        message: 'Test message',
      };
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockCob = { status: 201, data: { txid: 'txid', loc: { id: 'loc_id', location: 'location' }, pixCopiaECola: 'pix_copy_paste' } };
      const mockLinkSplit = { status: 204, data: {} };
      const mockQrCode = { status: 200, data: { imagemQrcode: 'qr_code' } };
      const mockCreatedTransactionID = 'created_transaction_id';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        body: mockRequestPayload,
      } as unknown as Request;

      (validate as jest.Mock).mockResolvedValue([]);
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (cobGenerator as jest.Mock).mockResolvedValue(mockCob);
      (linkSplitInCob as jest.Mock).mockResolvedValue(mockLinkSplit);
      (qrCodeGenerator as jest.Mock).mockResolvedValue(mockQrCode);
      (TransactionService.createTransaction as jest.Mock).mockResolvedValue({ createdTransactionID: mockCreatedTransactionID, error: null });
      (TransactionService.getTransactionById as jest.Mock).mockResolvedValue({ transaction: null, error: null });

      await TransactionController.createTransaction(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });
  });
});