// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(username: string): Promise<string> {
    const payload = { username };
    return this.jwtService.signAsync(payload);
  }
}
