import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Verify } from 'crypto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './dto/userInfo';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} // UsersService를 컨트롤러에 주입

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
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }
}