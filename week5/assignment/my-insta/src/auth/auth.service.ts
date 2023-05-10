import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto) { // 회원가입
    this.userService.createAccount(createUserDto);
  }

  async verificationEmail(email: string) { // 이메일 인증
    this.userService.sendEmail(email);
  }
}