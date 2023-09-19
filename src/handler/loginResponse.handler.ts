import { HttpStatus } from '@nestjs/common';

export class LoginResponseHandler {
  static handle(data: any, statusCode: HttpStatus) {
    return {
      ...data,
      statusCode,
    };
  }
}
