import { Controller, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check')
  async checkIdDuplication(@Body() createUserDto: CreateUserDto) {
    const {userId} = createUserDto
    return await this.userService.checkIdDuplication(userId);
  }

  @Get('search/:userId')
  async findUser(@Param('userId') userId: string) {
    return this.userService.findUser(userId);
  }
}