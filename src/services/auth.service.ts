import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import { IUser } from '../prisma';
import { errorResponse } from '../utils';
import { validateRegisterParams } from '../validators';

class AuthService {
  async register(body: IUser) {
    return {
      success: true,
      message: 'Account successfully created',
    };
  }

  validateRegisterationParams(body: IUser) {
    const { error } = validateRegisterParams(body);
    if (error) {
      errorResponse(error.details[0].message, 400);
    }
  }

  async login(body: any) {
    return {};
  }
}

export const authService = new AuthService();
