import { Request } from 'express';

import { IUser } from '../prisma';

export interface IRequest extends Request {
  user?: IUser;
}
