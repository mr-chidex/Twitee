// import mongoose from 'mongoose';
// import { IProduct, Product } from '../../../models';
// import { File, productsService } from '../../../services';
// import cloudinary from '../../../utils/cloudinary.utils';
// import { mockProduct } from '../../mocks';

import { Prisma } from '../../../prisma';
import { twitService } from '../../../services';
import { mockTwit, mockUser } from '../../mocks';

describe('ProductsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('validatePostedTwit', () => {
    it('should throw error on invalid twit details', () => {
      const twit = { twit: '' };

      expect(twitService.validatePostedTwit.bind(this, twit)).toThrow();
    });

    it('should return undefined on successfully validating product details', () => {
      const response = twitService.validatePostedTwit(mockTwit);

      expect(response).toBeUndefined();
    });
  });

  describe('addTwit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should create new twit', async () => {
      twitService.validatePostedTwit = jest.fn().mockReturnValue(null);

      Prisma.twit.create = jest.fn().mockResolvedValue(mockTwit);

      expect(Prisma.twit.create).not.toHaveBeenCalled();

      const response = await twitService.addTwit(mockUser, mockTwit);

      expect(response.data).toEqual(mockTwit);
      expect(Prisma.twit.create).toHaveBeenCalled();
    });
  });

  describe('getTwits', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return all twits', async () => {
      const twits = [{ twit: 'test' }];

      Prisma.twit.findMany = jest.fn().mockResolvedValue(twits);

      expect(Prisma.twit.findMany).not.toHaveBeenCalled();

      const response = await twitService.getTwits();

      expect(response.data).toEqual(twits);
      expect(Prisma.twit.findMany).toHaveBeenCalled();
    });
  });

  describe('validateId', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error on empty id', () => {
      expect(twitService.validateId.bind(this, '')).toThrow('invalid id');
    });

    it('should throw error on invalid id type', async () => {
      expect(twitService.validateId.bind(this, 'id')).toThrow('invalid id');
    });

    it('should return id on valid id type', async () => {
      const response = twitService.validateId('1');

      expect(response).toBe(1);
    });
  });

  describe('getTwit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return twit', async () => {
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(mockTwit);

      const response = await twitService.getTwit('1');

      expect(response.data).toEqual(mockTwit);
    });
  });

  describe('getAllTwitOfAUser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return all user twits', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      Prisma.twit.findMany = jest.fn().mockResolvedValue([mockTwit]);

      expect(twitService.validateId).not.toHaveBeenCalled();

      const response = await twitService.getAllTwitOfAUser('1');

      expect(response.success).toBe(true);
      expect(response.data).toEqual([mockTwit]);
      expect(twitService.validateId).toHaveBeenCalledWith('1');
    });
  });

  describe('deleteTwit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw unauthorized error if twit does not belong to user', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(null);

      expect(twitService.deleteTwit(mockUser, '1')).rejects.toThrow('Not authorized to delete this twit: Forbidden');
    });

    it('should successfully delete twit', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue({
        twit: 'Hello world',
      });
      Prisma.twit.delete = jest.fn().mockResolvedValue(true);

      expect(Prisma.twit.delete).not.toHaveBeenCalled();

      const response = await twitService.deleteTwit(mockUser, '1');

      expect(Prisma.twit.delete).toHaveBeenCalled();
      expect(response.message).toBe('Twit successfully deleted');
    });
  });

  describe('updateTwit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw unauthorized error if twit does not belong to user', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      twitService.validatePostedTwit = jest.fn().mockReturnValue(null);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(null);

      expect(twitService.updateTwit(mockUser, '1', mockTwit)).rejects.toThrow(
        'Not authorized to update this twit: Forbidden',
      );
    });

    it('should successfully update twit', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      twitService.validatePostedTwit = jest.fn().mockReturnValue(null);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue({
        twit: 'Hello world',
      });
      Prisma.twit.update = jest.fn().mockResolvedValue(true);

      expect(Prisma.twit.update).not.toHaveBeenCalled();

      const response = await twitService.updateTwit(mockUser, '1', mockTwit);

      expect(Prisma.twit.update).toHaveBeenCalled();
      expect(response.message).toBe('Twit successfully updated');
    });
  });

  describe('likeOrUnlikeTwit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw twit not found error if twit does not exist', () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(null);

      expect(twitService.likeOrUnlikeTwit(mockUser, '1')).rejects.toThrow('twit not found');
    });

    it('should unlike twit if twit has already been liked', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(mockTwit);
      Prisma.like.findFirst = jest.fn().mockResolvedValue(true);
      Prisma.like.delete = jest.fn().mockResolvedValue(true);
      Prisma.like.create = jest.fn().mockResolvedValue(true);

      expect(Prisma.like.delete).not.toHaveBeenCalled();

      const response = await twitService.likeOrUnlikeTwit(mockUser, '1');

      expect(Prisma.like.findFirst).toHaveBeenCalled();
      expect(Prisma.like.delete).toHaveBeenCalled();
      expect(Prisma.like.create).not.toHaveBeenCalled();
      expect(response.message).toBe('success');
    });

    it('should like twit if twit has not been liked', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(mockTwit);
      Prisma.like.findFirst = jest.fn().mockResolvedValue(false);
      Prisma.like.delete = jest.fn().mockResolvedValue(true);
      Prisma.like.create = jest.fn().mockResolvedValue(true);

      expect(Prisma.like.create).not.toHaveBeenCalled();

      const response = await twitService.likeOrUnlikeTwit(mockUser, '1');

      expect(Prisma.like.findFirst).toHaveBeenCalled();
      expect(Prisma.like.create).toHaveBeenCalled();
      expect(Prisma.like.delete).not.toHaveBeenCalled();
      expect(response.message).toBe('success');
    });
  });

  describe('createComment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error if twit does not exist', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      twitService.validatePostedTwit = jest.fn().mockReturnValue(true);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(null);

      expect(twitService.createComment(mockUser, mockTwit, '1')).rejects.toThrow(
        "Can't comment on this twit. Twit not found",
      );
    });

    it('should create comment on twit', async () => {
      twitService.validateId = jest.fn().mockReturnValue(1);
      twitService.validatePostedTwit = jest.fn().mockReturnValue(true);
      Prisma.twit.findFirst = jest.fn().mockResolvedValue(true);
      Prisma.twit.create = jest.fn().mockResolvedValue('comment');

      const response = await twitService.createComment(mockUser, mockTwit, '1');

      expect(response.message).toEqual('Comment successfully posted');
      expect(response.data).toEqual('comment');
      expect(Prisma.twit.create).toHaveBeenCalled();
    });
  });
});
