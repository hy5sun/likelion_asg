import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createAccount(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createAccount(createUserDto);
  }

  @Post('send-email')
  async sendEmail(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    return await this.userService.sendEmail(email);
  }

  @Get('search/:userId')
  async findUser(@Param('userId') userId: string) {
    return this.userService.findUser(userId);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}