import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(private readonly emailService: EmailService) {}
  users: CreateAuthDto[] = [];

  async sendEmail(email: string) { // 인증 이메일 보내기
    const user = this.users.find((user) => email === user.email);
    try{
      return await this.emailService.send(email);
    } catch(e) {
      console.log(e);
    }
    
  }

  async signup(createAuthDto: CreateAuthDto) { // 회원가입
    const { email, name, userId, password} = createAuthDto;
    
    const user: CreateAuthDto = {
      email,
      name,
      userId,
      password,
    };

    this.users.push(user);
  }

  findAll() { // 테스트용 유저 찾기
    return this.users;
  }
}
