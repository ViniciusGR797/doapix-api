import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../src/middlewares/auth';
import { Token } from '../src/securities/token';

jest.mock('../src/securities/token');

describe('authMiddleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  it('should return 401 if no token is provided', async () => {
    req.headers = {};
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'O token JWT não foi fornecido ou é inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should set user_id in request and call next if token verification succeeds', async () => {
    const userId = 'user123';
    req.headers = { authorization: 'Bearer valid_token' };
    (Token.verifyToken as jest.Mock).mockResolvedValueOnce(userId);

    await authMiddleware(req, res, next);
    expect(req.user_id).toEqual(userId);
    expect(next).toHaveBeenCalled();
  });

  it('should return 500 if an internal server error occurs', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    const mockError = new Error('Internal server error');
    (Token.verifyToken as jest.Mock).mockRejectedValueOnce(mockError);

    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Erro interno do servidor' });
    expect(next).not.toHaveBeenCalled();
  });
});
