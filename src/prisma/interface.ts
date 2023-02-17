export enum TwitType {
  TWIT = 'twit',
  COMMENT = 'comment',
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
