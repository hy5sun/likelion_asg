import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/users.models';
import authConfig from 'src/config/authConfig';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  // 회원가입
  async signup(createUserDto: CreateUserDto) {
    this.userService.createAccount(createUserDto);
  }

  // 이메일 인증
  async verificationEmail(email: string) {
    this.userService.sendEmail(email);
  }

  // 로그인
  async login(loginDto: LoginDto) {
    this.validateUser(loginDto.userId, loginDto.password);
    const payload = { loginDto };

    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d', // 만료시간
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  // signupVerifyToken: 회원가입시, 서버에서 발급한 임의의 토큰.
  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // 해당 토큰을 갖고 회원가입 중인 user 있는지 확인 후 없으면 예외처리
    const user = await this.usersRepository.findOne({
      where: { signupVerifyToken },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return this.login({
      userId: user.userId,
      password: user.password,
    });
  }

  // JWT 토큰 검증 (jsonwebtoken을 이용해서 검증 수행)
  verify(jwtStrng: string) {
    try {
      const payload = jwt.verify(jwtStrng, this.config.jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        User;

      const { id, email } = payload;

      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // Id/PW 맞게 썼는지 여부 확인
  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { userId, password },
    });

    if (!user) {
      throw new ForbiddenException('아이디 혹은 비밀번호가 틀렸습니다.');
    }

    if (user && user.password === password) {
      const { password, ...result } = user; //...result 가 뭘까요
      return result;
    }

    return user;
  }
}
