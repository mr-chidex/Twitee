import { ITwit, IUser } from '../../prisma';

export const mockUser = { name: 'test', email: 'test@email.com', password: 'test1234' } as IUser;

export const mockTwit = { twit: 'hello world' } as ITwit;
