// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<{ token: string }> {
    // Simulate validation (replace with your actual validation logic)
    const isValid = await this.validateCredentials(credentials);

    if (isValid) {
      const token = await this.authService.generateToken(credentials.username);
      return { token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  // Simulate user validation (replace with your actual validation logic)
  private async validateCredentials(credentials: {
    username: string;
    password: string;
  }): Promise<boolean> {
    // Implement your logic to validate the user's credentials (e.g., compare with stored data)
    // Return true if valid, false otherwise
    return true; // Replace this with your actual validation
  }
}
