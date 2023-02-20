import { ITwit, IUser, Prisma, TwitType } from '../prisma';
import { errorResponse } from '../utils';
import { validateTWit } from '../validators';

class TwitService {
  async addTwit(user: IUser, body: ITwit) {
    this.validatePostedTwit(body);

    const { twit } = body as ITwit;

    const newTwit = await Prisma.twit.create({
      data: { twit, userId: user.id },
    });

    return {
      success: true,
      message: 'Twit posted successfully',
      data: { twit: newTwit },
    };
  }

  validatePostedTwit(twit: ITwit) {
    const { error } = validateTWit(twit);

    if (error) {
      errorResponse(error.details[0].message, 400);
    }
  }

  async getTwits() {
    const twits = await Prisma.twit.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
        likes: true,
        comments: true,
      },
      where: { type: TwitType.TWIT },
    });

    return {
      success: true,
      message: 'success',
      data: twits,
    };
  }

  async getTwit(twitId: string) {
    const twitID = this.validateId(twitId);

    const twit = await Prisma.twit.findFirst({
      where: { id: twitID },
      include: {
        user: {
          select: { name: true, email: true },
        },
        likes: true,
        comments: true,
      },
    });

    return {
      success: true,
      message: 'success',
      data: twit,
    };
  }

  validateId(id: any) {
    if (!id) {
      errorResponse('invalid id', 400);
    }

    const twitId = parseInt(id);

    if (!twitId) {
      errorResponse('invalid id', 400);
    }
    return twitId;
  }

  async getAllTwitOfAUser(userId: string) {
    const userID = this.validateId(userId);

    const twits = await Prisma.twit.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
        likes: true,
        comments: true,
      },
      where: { type: TwitType.TWIT, userId: userID },
    });
    userID;

    return {
      success: true,
      message: 'success',
      data: twits,
    };
  }

  async deleteTwit(user: IUser, id: string) {
    const twitId = this.validateId(id);

    // get twit if it belongs to user
    const twit = await Prisma.twit.findFirst({
      where: { id: twitId, userId: user.id },
    });

    if (!twit) {
      return errorResponse('Not authorized to delete this twit: Forbidden', 403);
    }

    await Prisma.twit.delete({
      where: { id: twitId },
    });

    return {
      success: true,
      message: 'Twit successfully deleted',
    };
  }

  async updateTwit(user: IUser, id: string, body: ITwit) {
    const twitId = this.validateId(id);

    this.validatePostedTwit(body);

    const { twit } = body;

    // get twit if it belongs to user
    const isExist = await Prisma.twit.findFirst({
      where: { id: twitId, userId: user.id },
    });

    if (!isExist) {
      return errorResponse('Not authorized to update this twit: Forbidden', 403);
    }

    const updatedTwit = await Prisma.twit.update({
      where: {
        id: twitId,
      },
      data: {
        twit,
      },
    });

    return {
      success: true,
      message: 'Twit successfully updated',
      data: { twit: updatedTwit },
    };
  }

  async likeOrUnlikeTwit(user: IUser, id: string) {
    const twitId = this.validateId(id);

    const twit = await Prisma.twit.findFirst({ where: { id: twitId } });
    if (!twit) {
      return errorResponse('twit not found', 404);
    }

    // check if twit has been liked by user
    const alreadLiked = await Prisma.like.findFirst({ where: { userId: user.id, twitId } });

    // if already liked, unlike twit
    if (alreadLiked) {
      await Prisma.like.delete({ where: { id: alreadLiked.id } });
    } else {
      // like twit
      await Prisma.like.create({
        data: { userId: user.id, twitId },
      });
    }

    return {
      success: true,
      message: 'success',
    };
  }
}

export const twitService = new TwitService();
