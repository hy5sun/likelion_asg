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
    // CreateUserDto로 해도 되는 걸까요 회원가입Dto를 새로 만들어서 써야할까요
    return await this.userService.createAccount(signupDto);
  }

  // 불필요한 필드는 줄일 것..!
  @Post('send-verification-email')
  async verificationEmail(email: string) {
    return await this.authService.verificationEmail(email);
  }
}
