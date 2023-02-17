export interface JWTTOKEN {
  userId: number;
  iss: string;
  iat: number;
}

export enum PostType {
  POST = 'twit',
  COMMENT = 'comment',
}
