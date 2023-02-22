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

  describe('find user by email', () => {
    it('should return user with email', async () => {
      Prisma.user.findFirst = jest.fn().mockResolvedValue(mockUser);

      expect(Prisma.user.findFirst).not.toHaveBeenCalled();

      const response = await authService.findUserByEmail('test@email');

      expect(Prisma.user.findFirst).toHaveBeenCalled();
      expect(response).toEqual(mockUser);
    });
  });
});
