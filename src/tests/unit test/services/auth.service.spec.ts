import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Prisma } from '../../../prisma';

import { authService } from '../../../services';
import { mockUser } from '../../mocks';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('validateRegisterationParams', () => {
    it('should throw error if details are not correct', async () => {
      const param = { name: 'test', password: 'invalid', email: 'invalid' };

      expect(authService.validateRegisterationParams.bind(this, param)).toThrow();
    });

    it('should return undefined on successfully validating params', () => {
      const response = authService.validateRegisterationParams(mockUser);

      expect(response).toBeUndefined();
    });
  });

  describe('find user by email', () => {
    it('should return user with email', async () => {
      Prisma.user.findFirst = jest.fn().mockResolvedValue(mockUser);

      expect(Prisma.user.findFirst).not.toHaveBeenCalled();

      const response = await authService.findUserByEmail('test@email');

      expect(Prisma.user.findFirst).toHaveBeenCalled();
      expect(response).toEqual(mockUser);
    });
  });

  describe('validateRegisterationEmail', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error if email is alredy in use', async () => {
      authService.findUserByEmail = jest.fn().mockReturnValue(true);

      expect(authService.validateRegisterationEmail('usedEmail')).rejects.toThrow('Email already in use');
    });

    it('should return undefined on successful validation', async () => {
      authService.findUserByEmail = jest.fn().mockReturnValue(false);

      const response = await authService.validateRegisterationEmail('usedEmail');

      expect(response).toBeUndefined();
    });
  });

  describe('hashPassword', () => {
    it('should return hashed password', async () => {
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('1234' as never);

      bcrypt.hash = jest.fn().mockResolvedValue('hashedPass');

      expect(bcrypt.hash).not.toHaveBeenCalled();

      const response = await authService.hashPassword(mockUser.password);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, '1234');
      expect(response).toEqual('hashedPass');
    });
  });
});
