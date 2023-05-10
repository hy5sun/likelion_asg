import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(private readonly emailService: EmailService) {}
  users: CreateAuthDto[] = [];

  async sendEmail(email: string) {
    const user = this.users.find((user) => email === user.email);
    try{
      return await this.emailService.send(email);
    } catch(e) {
      console.log(e);
    }
    
  }

  async signup(createAuthDto: CreateAuthDto) {
    const { email, name, nickname, password} = createAuthDto;
    
    const user: CreateAuthDto = {
      email,
      name,
      nickname,
      password,
    };

    this.users.push(user);
  }

  findAll() {
    return this.users;
  }
}
