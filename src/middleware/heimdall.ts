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
export class Heimdall implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];
      if (!accessToken) return res.status(403).json({ error: 'AUTH_FAILED' });

      const decodeToken = (await tokenDecode(accessToken)) as {
        payload: TokenPayload;
      };
      if (!decodeToken) return res.status(403).json({ error: 'AUTH_FAILED' });

      console.log({ decodeToken });
      const verifyToken = await tokenVerify(accessToken);
      console.log({ verifyToken });
      if (verifyToken === 'expire')
        return res.status(403).json({ error: 'AUTH_FAILED' });

      const foundedUser = await this.usersService.findOne(
        decodeToken.payload.userId,
      );
      console.log({ foundedUser });
      if (!foundedUser) return res.status(403).json({ error: 'AUTH_FAILED' });
      // if (!foundedUser.accessToken.includes(accessToken))
      //   return res.status(403).json({ error: 'AUTH_FAILED' });

      req.userId = decodeToken.payload.userId;
      req.accessToken = accessToken;
      req.role = decodeToken.payload.role;
      next();
    } catch (e) {
      console.error({ e });
      res.status(403).json({ error: 'AUTH_FAILED' });
    }
  }
}
