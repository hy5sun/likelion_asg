import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  async signup(createUserDto: CreateUserDto) {
    this.userService.createAccount(createUserDto);
  }

  // 이메일 인증
  async verificationEmail(email: string) {
    this.userService.sendEmail(email);
  }
}
