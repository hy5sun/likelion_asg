import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { User } from './users.models';
import { CreateUserDto } from './dto/create-user.dto';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly emailService: EmailService) {}
  users: User[] = [];

  async createAccount(createUserDto: CreateUserDto) {
    const { email, name, userId, password } = createUserDto;

    const user: User = {
      id: uuid,
      email,
      name,
      userId,
      password,
    };

    const idDupUser = this.users.find((user) => user.userId === userId); // 아이디 중복 유저
    const emailDupUser = this.users.find((user) => user.email === email); // 메일 중복 유저

    if (idDupUser) {
      throw new ConflictException('이미 있는 아이디입니다.');
    }

    if (emailDupUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    try {
      this.sendEmail(user.email); // 회원가입하면 바로 인증 이메일 보내기
    } catch (e) {
      console.log(e);
    }

    this.users.push(user); // 저장

    return user;
  }

  async sendEmail(email: string) {
    // 인증 이메일 보내기
    try {
      return await this.emailService.send(email);
    } catch (e) {
      console.log(e);
    }
  }

  async findUser(userId: string) {
    // 검색 통해서 유저 찾기
    const user = this.users.find((user) => user.userId === userId);

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return user;
  }

  async findAll() {
    // 테스트용 전체 유저 찾기
    return this.users;
  }
}
