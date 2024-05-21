import { Request, Response } from 'express';
import { DonationController } from '../src/controllers/donationController';
import { DonationService } from '../src/services/donationServices';
import { TransactionService } from '../src/services/transactionServices';
import { DonationInsert, DonationUpdate } from '../src/models/donationModel';
import { validarUUID } from '../src/utils/validate';

jest.mock('../src/services/donationServices');
jest.mock('../src/services/transactionServices');
jest.mock('../src/utils/validate');

describe('DonationController', () => {
  describe('getDonation', () => {
    it('should return 200 with donations if successful', async () => {
      const mockDonations = [{ id: '1', name: 'Donation 1' }];
      (DonationService.getDonations as jest.Mock).mockResolvedValue({ donations: mockDonations, error: null });
      const mockRequest = {} as Request;
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.getDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDonations);
    });

    it('should return 500 if an error occurs', async () => {
      const errorMessage = 'Internal server error';
      (DonationService.getDonations as jest.Mock).mockResolvedValue({ donations: null, error: errorMessage });
      const mockRequest = {} as Request;
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.getDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: errorMessage });
    });
  });

  describe('getDonationById', () => {
    it('should return 200 with donation data if successful', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockDonation = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'Donation 1' };
      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
      (TransactionService.getTransactionByDonation as jest.Mock).mockResolvedValue({ transactions: [], error: null });
      const mockRequest = { params: { donation_id: mockDonationId }, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      } as unknown as Response;

      await DonationController.getDonationById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining(mockDonation));
    });
  });

  describe('createDonation', () => {
    it('should return 201 with created donation data if successful', async () => {
      const mockRequestBody = {
        name: 'Donation Name',
        description: 'Donation Description',
        goal: '1000',
        url_image: 'https://example.com/image.jpg',
        deadline: '2024-12-31T23:59:59.999Z',
        state: 'active',
        category: 'Category',
      };
      const mockRequest = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', body: mockRequestBody } as unknown as Request;
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      } as unknown as Response;

      (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', error: null });

      await DonationController.createDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    });

    /*it('should return 400 if userId is invalid', async () => {
      const mockRequest = { user_id: 'invalidUserId', body: {} } as unknown as Request;
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

      await DonationController.createDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
    });*/
  });

  describe('updateDonation', () => {
    it('should return 200 with updated donation data if successful', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockRequestBody = { name: 'Updated Donation Name', description: 'Updated Donation Description', goal: '1500', url_image: 'https://example.com/updated_image.jpg', deadline: '2025-12-31T23:59:59.999Z', state: 'updated', category: 'Updated Category' };
      const mockRequest = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: mockDonationId }, body: mockRequestBody } as unknown as Request;
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockRequestBody, error: null });
      (DonationService.updateDonation as jest.Mock).mockResolvedValue({ updatedDonation: mockRequestBody, error: null });

      await DonationController.updateDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRequestBody);
    });

    /*it('should return 400 if userId is invalid', async () => {
      const mockRequest = { user_id: 'invalidUserId', params: { donation_id: 'validDonationId' }, body: {} } as unknown as Request;
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

      await DonationController.updateDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
    });*/
  });

  describe('deleteDonation', () => {
    it('should return 200 if deletion is successful', async () => {
      const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
      const mockRequest = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: mockDonationId } } as unknown as Request;
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

      (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: { id: mockDonationId }, error: null });
      (DonationService.deleteDonation as jest.Mock).mockResolvedValue({ deletedDonation: null, error: null });

      await DonationController.deleteDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Excluído com sucesso' });
    });
    /*it('should return 400 if userId is invalid', async () => {
      const mockRequest = { user_id: 'invalidUserId', params: { donation_id: 'validDonationId' } } as unknown as Request;
      const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

      await DonationController.deleteDonation(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
    });*/
  });
});