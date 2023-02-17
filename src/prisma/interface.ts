export enum TwitType {
  TWIT = 'twit',
  COMMENT = 'comment',
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface ITwit {
  id: number;
  twit: string;
  type: TwitType;
}
