import { Request, Response } from 'express';
import { DonationController } from '../src/controllers/donationController';
import { DonationService } from '../src/services/donationServices';
import { TransactionService } from '../src/services/transactionServices';

jest.mock('../src/services/donationServices');
jest.mock('../src/services/transactionServices');

describe('DonationController', () => {
  describe('getDonation', () => {
    it('should return donations when successful', async () => {
      const mockDonations = [{ id: 1, name: 'Donation 1' }, { id: 2, name: 'Donation 2' }];
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      (DonationService.getDonations as jest.Mock).mockResolvedValue({ donations: mockDonations, error: null });

      await DonationController.getDonation({} as Request, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDonations);
    });

    it('should return error message when failed to get donations', async () => {
      const mockError = 'Failed to get donations';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      (DonationService.getDonations as jest.Mock).mockResolvedValue({ donations: null, error: mockError });

      await DonationController.getDonation({} as Request, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });
  });

  describe('getDonationById', () => {
    it('should return donation details and comments when successful', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockTransactions = [{ alias: 'User 1', message: 'Comment 1' }, { alias: 'User 2', message: 'Comment 2' }];
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { donation_id: mockDonationId },
      } as unknown as Request;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (TransactionService.getTransactionByDonation as jest.Mock).mockResolvedValue({ transactions: mockTransactions, error: null });

      await DonationController.getDonationById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: mockDonation.id,
        name: mockDonation.name,
        transactions_count: mockTransactions.length,
        comments: mockTransactions.map((item) => ({ alias: item.alias, message: item.message })),
      });
    });

    it('should return error message when failed to get donation by id', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockError = 'Failed to get donation';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { donation_id: mockDonationId },
      } as unknown as Request;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: mockError });

      await DonationController.getDonationById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });

    it('should return "Nenhum dado encontrado" when donation is not found', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { donation_id: mockDonationId },
      } as unknown as Request;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: null });

      await DonationController.getDonationById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });

    it('should return error message when failed to get transactions by donation', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockDonation = { id: 1, name: 'Donation 1' };
      const mockError = 'Failed to get transactions';
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;
      const mockRequest = {
        params: { donation_id: mockDonationId },
      } as unknown as Request;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (TransactionService.getTransactionByDonation as jest.Mock).mockResolvedValue({ transactions: null, error: mockError });

      await DonationController.getDonationById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError });
    });
  });

  describe('createDonation', () => {
    it('should return 400 status code and error message if user ID is invalid', async () => {
      const req = { body: {}, user_id: 'invalid_id' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.createDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
    });

    it('should return 400 status code and error message if payload validation fails', async () => {
      const req = { body: {}, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const errorMessage = 'O campo name é obrigatório';
      (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId: null, error: errorMessage });

      await DonationController.createDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
    });

    it('should return 500 status code and error message if there is an error in creating donation', async () => {
      const req = { body: {
        "name": "Teste",
        "goal": "80.00",
        "url_image": "image",
        "deadline": "2024-03-24",
        "state": "MG",
        "category": "Saúde / Tratamentos",
        "description": "Testando callback"
      }, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const errorMessage = 'Error creating donation';
      (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId: null, error: errorMessage });

      await DonationController.createDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
    });

    it('should return 404 status code and error message if no donation is created', async () => {
      const req = { body: {
        "name": "Teste",
        "goal": "80.00",
        "url_image": "image",
        "deadline": "2024-03-24",
        "state": "MG",
        "category": "Saúde / Tratamentos",
        "description": "Testando callback"
      }, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId: null, error: null });

      await DonationController.createDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });

    it('should return 500 status code and error message if there is an error in getting donation by ID', async () => {
      const req = { body: {
        "name": "Teste",
        "goal": "80.00",
        "url_image": "image",
        "deadline": "2024-03-24",
        "state": "MG",
        "category": "Saúde / Tratamentos",
        "description": "Testando callback"
      }, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const createdDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const errorMessage = 'Error getting donation by ID';
      (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId, error: null });
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: errorMessage });

      await DonationController.createDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
    });

    it('should return 404 status code and error message if no donation is found after creation', async () => {
      const req = { body: {
        "name": "Teste",
        "goal": "80.00",
        "url_image": "image",
        "deadline": "2024-03-24",
        "state": "MG",
        "category": "Saúde / Tratamentos",
        "description": "Testando callback"
      }, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const createdDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId, error: null });
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: null });

      await DonationController.createDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });

    it('should return 201 status code and created donation if donation is created successfully', async () => {
      const req = { body: {
        "name": "Teste",
        "goal": "80.00",
        "url_image": "image",
        "deadline": "2024-03-24",
        "state": "MG",
        "category": "Saúde / Tratamentos",
        "description": "Testando callback"
      }, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const createdDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const donation = { id: createdDonationId, name: 'Donation 1' };
      (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId, error: null });
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation, error: null });

      await DonationController.createDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(donation);
    });
  });

  describe('updateDonation', () => {
    it('should return 400 status code and error message if user ID is invalid', async () => {
      const req = { user_id: 'invalid_id' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
    });

    it('should return 400 status code and error message if donation ID is invalid', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: 'invalid_id' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'ID da donation inválido' });
    });

    it('should return 500 status code and error message if there is an error in getting donation by ID', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const errorMessage = 'Error getting donation by ID';
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: errorMessage });

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
    });

    it('should return 404 status code and error message if no donation is found', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: null });

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });

    it('should return 400 status code and error message if user is not the creator of the donation', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const donation = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'Donation 1', user_id: 'other_user_id' };
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation, error: null });

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Apenas o usuário que criou essa campanha pode editar' });
    });

    it('should return 400 status code and error message if payload validation fails', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' }, body: {} } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const donation = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'Donation 1', user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' };
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation, error: null });

      const errorMessage = 'O campo name é obrigatório';
      (DonationService.updateDonation as jest.Mock).mockResolvedValue({ updatedDonation: null, error: errorMessage });

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
    });

    it('should return 500 status code and error message if there is an error in updating donation', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' }, body: {
        "name": "Teste",
        "goal": "80.00",
        "url_image": "image",
        "deadline": "2024-03-24",
        "state": "MG",
        "category": "Saúde / Tratamentos",
        "description": "Testando callback"
      } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const donation = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'Donation 1', user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' };
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation, error: null });

      const errorMessage = 'Error updating donation';
      (DonationService.updateDonation as jest.Mock).mockResolvedValue({ updatedDonation: null, error: errorMessage });

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
    });

    it('should return 200 status code and updated donation if donation is updated successfully', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' }, body: {
        "name": "Teste",
        "goal": "80.00",
        "url_image": "image",
        "deadline": "2024-03-24",
        "state": "MG",
        "category": "Saúde / Tratamentos",
        "description": "Testando callback"
      } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const donation = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'Donation 1', user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' };
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation, error: null });

      const updatedDonation = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'Updated Donation 1' };
      (DonationService.updateDonation as jest.Mock).mockResolvedValue({ updatedDonation, error: null });

      await DonationController.updateDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedDonation);
    });
  });

  describe('deleteDonation', () => {
    it('should return 400 status code and error message if user ID is invalid', async () => {
      const req = { user_id: 'invalid_id' } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.deleteDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
    });

    it('should return 400 status code and error message if donation ID is invalid', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: 'invalid_id' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.deleteDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'ID da donation inválido' });
    });

    it('should return 500 status code and error message if there is an error in getting donation by ID', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const errorMessage = 'Error getting donation by ID';
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: errorMessage });

      await DonationController.deleteDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
    });

    it('should return 404 status code and error message if no donation is found', async () => {
      const req = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: null, error: null });

      await DonationController.deleteDonation(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Nenhum dado encontrado' });
    });
  });

});
