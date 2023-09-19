import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler extends HttpException {
  constructor(error: string, code: HttpStatus) {
    const response = {
      error,
    };
    super(response, code);
  }
}
