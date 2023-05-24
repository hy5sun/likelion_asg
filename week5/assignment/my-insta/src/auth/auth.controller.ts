import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.userService.createAccount(signupDto);
  }

  @Post('send-verification-email')
  async verificationEmail(email: string) {
    return await this.authService.verificationEmail(email);
  }

  @UseGuards(AuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);
    return accessToken;
  }
}
