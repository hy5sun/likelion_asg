import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) { // CreateUserDto로 해도 되는 걸까요 회원가입Dto를 새로 만들어서 써야할까요
    return await this.authService.signup(createUserDto);
  }

  @Post('send-verification-email')
  async verificationEmail(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    return await this.authService.verificationEmail(email);
  }
}