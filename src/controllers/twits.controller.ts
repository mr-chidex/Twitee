import { Response } from 'express';

import { twitService } from '../services';
import { IRequest } from './inteface';

class TwitController {
  //@POST
  async postTwit(req: IRequest, res: Response) {
    const response = await twitService.addTwit(req.user!, req.body);
    res.status(201).json({ ...response });
  }

  async getAllTwits() {}

  async getTwit() {}

  async getUserTwits() {}

  async deleteTwit() {}

  async updateTwit() {}
}

export const twitController = new TwitController();
