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
        user: true,
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

  async getTwit(twitId: number) {
    const twit = await Prisma.twit.findFirst({ where: { id: twitId } });

    return {
      success: true,
      message: 'success',
      data: twit,
    };
  }
}

export const twitService = new TwitService();
