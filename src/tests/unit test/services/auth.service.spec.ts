import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import { IUser, Prisma } from '../../../prisma';
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

  describe('register', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should create a user', async () => {
      authService.validateRegisterationParams = jest.fn().mockReturnValue(null);
      authService.validateRegisterationEmail = jest.fn().mockResolvedValue(null);
      authService.hashPassword = jest.fn().mockResolvedValue('hashed');
      Prisma.user.create = jest.fn().mockResolvedValue(true);

      const response = await authService.register(mockUser);

      expect(response.success).toBe(true);
      expect(response.message).toBe('Account successfully created');
      expect(Prisma.user.create).toHaveBeenCalled();
    });
  });

  describe('validateCredentials', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error on incorrect email', () => {
      Prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      expect(authService.validateCredentials.bind('incorrect', 'correct')).rejects.toThrow(
        'Email or Password is incorrect',
      );
      expect(Prisma.user.findUnique).toHaveBeenCalled();
    });

    it('should throw error on incorrect password', () => {
      Prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      expect(authService.validateCredentials.bind(this, 'test@email.com', '')).rejects.toThrow(
        'Email or Password is incorrect',
      );
    });

    it('should return user', async () => {
      Prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const response = await authService.validateCredentials('test@email.com', 'test123');

      expect(response).toEqual(mockUser);
    });
  });

  describe('getToken', () => {
    it('should return token', () => {
      jest.spyOn(JWT, 'sign').mockReturnValue();

      expect(JWT.sign).not.toHaveBeenCalled();

      authService.getToken(mockUser);

      expect(JWT.sign).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error on incorrect details', () => {
      const params = { email: 'incorrect', passsword: 'test' };

      expect(authService.login.bind(this, params)).rejects.toThrow();
    });

    it('should return token on successful login', async () => {
      const user = { email: 'test@email.com', password: 'test123' } as IUser;

      authService.validateCredentials = jest.fn().mockResolvedValue(user);
      authService.getToken = jest.fn().mockReturnValue('token');

      expect(authService.getToken).not.toHaveBeenCalled();

      const response = await authService.login(user);

      expect(authService.getToken).toHaveBeenCalledWith(user);
      expect(response.success).toBe(true);
      expect(response.data).toBe('token');
    });
  });
});
