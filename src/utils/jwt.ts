// jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
let secretKey = 'asdasd132121dasdasdasdsadasdasdasdasdasd';

@Injectable()
export class jwtService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
