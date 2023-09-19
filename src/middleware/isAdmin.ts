import { Request, Response, NextFunction } from 'express';
import tokenVerify from '../jwt/tokenVerify';
import tokenDecode from '../jwt/tokenDecode';
import { UsersService } from '../users/users.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
interface TokenPayload {
  userId: string;
  role: string;
}
@Injectable()
export class IsAdmin implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];
      if (!accessToken) return res.status(403).json({ error: 'AUTH_FAILED' });

      const decodeToken = (await tokenDecode(accessToken)) as {
        payload: TokenPayload;
      };
      if (!decodeToken) return res.status(403).json({ error: 'AUTH_FAILED' });
      if (decodeToken.payload.role !== 'ADMIN')
        return res.status(403).json({ error: 'AUTH_FAILED' });
      next();
    } catch (e) {
      console.error({ e });
      res.status(403).json({ error: 'AUTH_FAILED' });
    }
  }
}
