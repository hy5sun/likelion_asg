import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {}

  async checkIdDuplication(userId: string) { // 아이디 중복성 체크
    const user = this.authService.users.find((user) => userId === user.userId);

    if (user) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }
  }

  async findUser(userId: string) { // 검색 통해서 유저 찾기
    const user = this.authService.users.find((user) => userId === user.userId);

    if(!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return user;
  }
}
