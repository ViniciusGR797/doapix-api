// import { Request, Response } from 'express';
// import { DonationController } from '../src/controllers/donationController';
// import { DonationService } from '../src/services/donationServices';
// import { TransactionService } from '../src/services/transactionServices';
// import { DonationInsert, DonationUpdate } from '../src/models/donationModel';
// import { validarUUID } from '../src/utils/validate';

// jest.mock('../src/services/donationServices');
// jest.mock('../src/services/transactionServices');
// jest.mock('../src/utils/validate');

// describe('DonationController', () => {
//   describe('getDonation', () => {
//     it('should return 200 with donations if successful', async () => {
//       const mockDonations = [{ id: '1', name: 'Donation 1' }];
//       (DonationService.getDonations as jest.Mock).mockResolvedValue({ donations: mockDonations, error: null });
//       const mockRequest = {} as Request;
//       const mockResponse = {
//         status: jest.fn(() => mockResponse),
//         json: jest.fn(),
//       } as unknown as Response;

//       await DonationController.getDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith(mockDonations);
//     });

//     it('should return 500 if an error occurs', async () => {
//       const errorMessage = 'Internal server error';
//       (DonationService.getDonations as jest.Mock).mockResolvedValue({ donations: null, error: errorMessage });
//       const mockRequest = {} as Request;
//       const mockResponse = {
//         status: jest.fn(() => mockResponse),
//         json: jest.fn(),
//       } as unknown as Response;

//       await DonationController.getDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(500);
//       expect(mockResponse.json).toHaveBeenCalledWith({ msg: errorMessage });
//     });
//   });

//   describe('getDonationById', () => {
//     it('should return 200 with donation data if successful', async () => {
//       const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
//       const mockDonation = { id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', name: 'Donation 1' };
//       (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockDonation, error: null });
//       (TransactionService.getTransactionByDonation as jest.Mock).mockResolvedValue({ transactions: [], error: null });
//       const mockRequest = { params: { donation_id: mockDonationId }, user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc' } as unknown as Request;
//       const mockResponse = {
//         status: jest.fn(() => mockResponse),
//         json: jest.fn(),
//       } as unknown as Response;

//       await DonationController.getDonationById(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining(mockDonation));
//     });
//   });

//   describe('createDonation', () => {
//     it('should return 201 with created donation data if successful', async () => {
//       const mockRequestBody = {
//         name: 'Donation Name',
//         description: 'Donation Description',
//         goal: '1000',
//         url_image: 'https://example.com/image.jpg',
//         deadline: '2024-12-31T23:59:59.999Z',
//         state: 'active',
//         category: 'Category',
//       };
//       const mockRequest = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', body: mockRequestBody } as unknown as Request;
//       const mockResponse = {
//         status: jest.fn(() => mockResponse),
//         json: jest.fn(),
//       } as unknown as Response;

//       (DonationService.createDonation as jest.Mock).mockResolvedValue({ createdDonationId: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', error: null });

//       await DonationController.createDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(201);
//       expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
//     });

//     /*it('should return 400 if userId is invalid', async () => {
//       const mockRequest = { user_id: 'invalidUserId', body: {} } as unknown as Request;
//       const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

//       await DonationController.createDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(400);
//       expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
//     });*/
//   });

//   describe('updateDonation', () => {
//     it('should return 200 with updated donation data if successful', async () => {
//       const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
//       const mockRequestBody = { name: 'Updated Donation Name', description: 'Updated Donation Description', goal: '1500', url_image: 'https://example.com/updated_image.jpg', deadline: '2025-12-31T23:59:59.999Z', state: 'updated', category: 'Updated Category' };
//       const mockRequest = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: mockDonationId }, body: mockRequestBody } as unknown as Request;
//       const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

//       (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: mockRequestBody, error: null });
//       (DonationService.updateDonation as jest.Mock).mockResolvedValue({ updatedDonation: mockRequestBody, error: null });

//       await DonationController.updateDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith(mockRequestBody);
//     });

//     /*it('should return 400 if userId is invalid', async () => {
//       const mockRequest = { user_id: 'invalidUserId', params: { donation_id: 'validDonationId' }, body: {} } as unknown as Request;
//       const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

//       await DonationController.updateDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(400);
//       expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
//     });*/
//   });

//   describe('deleteDonation', () => {
//     it('should return 200 if deletion is successful', async () => {
//       const mockDonationId = '20f58ca1-bba7-4a38-bd3f-c59ea06511dc';
//       const mockRequest = { user_id: '20f58ca1-bba7-4a38-bd3f-c59ea06511dc', params: { donation_id: mockDonationId } } as unknown as Request;
//       const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

//       (DonationService.getDonationById as jest.Mock).mockResolvedValue({ donation: { id: mockDonationId }, error: null });
//       (DonationService.deleteDonation as jest.Mock).mockResolvedValue({ deletedDonation: null, error: null });

//       await DonationController.deleteDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Excluído com sucesso' });
//     });
//     /*it('should return 400 if userId is invalid', async () => {
//       const mockRequest = { user_id: 'invalidUserId', params: { donation_id: 'validDonationId' } } as unknown as Request;
//       const mockResponse = { status: jest.fn(() => mockResponse), json: jest.fn() } as unknown as Response;

//       await DonationController.deleteDonation(mockRequest, mockResponse);

//       expect(mockResponse.status).toHaveBeenCalledWith(400);
//       expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'ID do usuário inválido' });
//     });*/
//   });
// });
















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
});