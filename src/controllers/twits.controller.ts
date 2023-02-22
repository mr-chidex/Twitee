import { Request, Response } from 'express';

import { twitService } from '../services';
import { IRequest } from './inteface';

class TwitController {
  //@POST
  async postTwit(req: IRequest, res: Response) {
    const response = await twitService.addTwit(req.user!, req.body);
    res.status(201).json({ ...response });
  }

  //@GET
  async getAllTwit(req: Request, res: Response) {
    const response = await twitService.getTwits();
    res.status(200).json({ ...response });
  }

  //@GET
  async getTwit(req: Request, res: Response) {
    const response = await twitService.getTwit(req.params?.id);
    res.status(200).json({ ...response });
  }

  //@GET
  async getTwitsOfUser(req: Request, res: Response) {
    const response = await twitService.getAllTwitOfAUser(req.params?.userId);
    res.status(200).json({ ...response });
  }

  //@DELETE
  async deleteTwit(req: IRequest, res: Response) {
    const response = await twitService.deleteTwit(req.user!, req.params?.id);
    res.status(200).json({ ...response });
  }

  //@PATCH
  async updateTwit(req: IRequest, res: Response) {
    const response = await twitService.updateTwit(req.user!, req.params?.id, req.body);
    res.status(200).json({ ...response });
  }

  //@POST
  async likeAndUnlikeTwit(req: IRequest, res: Response) {
    const response = await twitService.likeOrUnlikeTwit(req.user!, req.params?.twitId);
    res.status(200).json({ ...response });
  }

  //@POST
  async addComment(req: IRequest, res: Response) {
    const response = await twitService.createComment(req.user!, req.body, req.params?.twitId);
    res.status(201).json({ ...response });
  }
}

export const twitController = new TwitController();
