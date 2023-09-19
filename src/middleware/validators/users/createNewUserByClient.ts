import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import * as Joi from 'joi';
import { ErrorHandler } from '../../../handler/error.handler';

@Injectable()
export class CreateNewUserByClient implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().max(25).min(6).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      console.log({ validationErrors });
      throw new ErrorHandler(`${validationErrors}`, HttpStatus.BAD_REQUEST);

      // throw new BadRequestException(validationErrors);
    }
    // Your validation logic here
    // Check and validate req.body, req.query, req.params, etc.
    // If validation fails, you can return an error response
    // Otherwise, call next() to continue to the next middleware/route handler
    next();
  }
}
