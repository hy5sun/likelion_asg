import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signup(createAuthDto);
  }

  @Post('send-verification-email')
  async sendEmail(@Body() createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;
    
    return await this.authService.sendEmail(email);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}
