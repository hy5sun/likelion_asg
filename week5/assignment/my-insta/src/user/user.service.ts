import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ulid } from 'ulid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createAccount(createUserDto: CreateUserDto) {
    const user = new UserEntity();
    user.id = ulid();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.userId = createUserDto.userId;

    console.log(this.usersRepository);

    const idDupUser = await this.usersRepository.findOne({
      where: { userId: createUserDto.userId },
    }); // 아이디 중복 유저

    // const emailDupUser = await this.usersRepository.find({
    //   where: { email: createUserDto.email },
    // }); // 메일 중복 유저

    if (idDupUser) {
      throw new ConflictException('이미 있는 아이디입니다.');
    }

    // if (emailDupUser) {
    //   throw new ConflictException('이미 가입된 이메일입니다.');
    // }

    try {
      this.sendEmail(user.email); // 회원가입하면 바로 인증 이메일 보내기
    } catch (e) {
      console.log(e);
    }

    await this.usersRepository.save(user);

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
    const user = this.usersRepository.findOne({
      where: { userId: userId },
    });

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return user;
  }

  async findAll() {
    // 테스트용 전체 유저 찾기
    return this.usersRepository;
  }
}
