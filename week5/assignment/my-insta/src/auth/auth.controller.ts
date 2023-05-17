import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';

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

  // 불필요한 필드는 줄일 것..!
  @Post('send-verification-email')
  async verificationEmail(email: string) {
    return await this.authService.verificationEmail(email);
  }
}
