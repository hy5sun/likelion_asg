import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus, DefaultValuePipe, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Verify } from 'crypto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './dto/userInfo';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} // UsersService를 컨트롤러에 주입

  @UseFilters(HttpExceptionFilter) // 특정 엔드포인트에 적용
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const {name, email, password} = dto;
    await this.usersService.createUser(name, email, password); // dto에서 얻은 정보를 UsersService에 전달
  }

  @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
      const {signupVerifyToken} = dto;

      return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) userId: number): Promise<UserInfo> { // @Param의 두 번째 인수로 pip를 넘겨 현재 실행 콘텍스트를 바인딩할 수 있다.
    return await this.usersService.getUserInfo(userId);
  }

  @Get()
  findAll (
    // DefaultValuePipe는 인수의 값에 기본값을 설정할 때 사용한다. 쿼리 매개변수가 생략된 경우 사용. 
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
    return this.usersService.findAll();
  }
}