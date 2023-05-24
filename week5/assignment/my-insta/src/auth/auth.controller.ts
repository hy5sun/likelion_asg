import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Req,
  Inject,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.userService.createAccount(signupDto);
  }

  @Post('send-verification-email')
  async verificationEmail(email: string) {
    return await this.authService.verificationEmail(email);
  }

  @UseGuards(AuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(
      loginDto.userId,
      loginDto.password,
    );
    const accessToken = await this.authService.login(loginDto);

    res.cookie('jwt', jwt, {
      httpOnly: true, // 쿠키를 브라우저에서 사용 못 하도록 (XSS 같은 걸 차단하면서 보안 강화 목적)
      maxAge: 24 * 60 * 60 * 1000, // 유효기간
    });
    return accessToken;
  }

  // 쿠키 jwt 잘 읽어오는지 확인
  @Get('cookie')
  async getCookie(@Req() req: Request, @Res() res: Response) {
    const jwt = req.cookies['jwt'];
    return res.send(jwt);
  }

  // 로그아웃
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { token, ...option } = await this.authService.logout();
    res.cookie('Authentication', token, option);

    /* 또 다른 방법
    res.cookie('jwt', '', { // jwt값 삭제
    maxAge: 0, // 유효기간을 0으로 설정
    });
    return res.send({
      message: 'logout success',
    });
    */
  }
}
