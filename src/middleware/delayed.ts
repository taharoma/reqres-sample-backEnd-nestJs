import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const delayTime = 5000;
    console.log(delayTime);
    setTimeout(() => {
      next();
    }, delayTime);
  }
}
