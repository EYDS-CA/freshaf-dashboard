import { Injectable } from '@nestjs/common';
@Injectable()
export class GoogleService {
  googleLogin(req) {
    if (!req.user) {
      return {
        message: 'Error: No user from google',
      };
    }

    if (req.user?.email?.split('@')[1] !== 'freshworks.io') {
      return {
        message: 'Error: Please use your Freshworks.io account',
      };
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
