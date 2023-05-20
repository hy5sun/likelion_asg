import { Controller, Get, Param, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // REST 형식에 맞추기 위해 id를 패스 매개변수로 다시 전달
  @UseGuards(AuthGuard)
  @Get('id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);

    /* 모든 엔드포인트에 중복 구현해야 함 -> 비효율적 & DRY 원칙 위배

    // Bearer 방식 인증 사용 & 헤더에서 JWT 파싱
    const jwtString = headers.authorization.split('Bearer ')[1];

    // JWT가 서버에서 발급한 것인지 검증
    this.authService.verifyEmail(jwtString);

    return this.usersService.getUserInfo(userId); 
    */
  }
}
