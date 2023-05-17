import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async findUser(@Param('userId') userId: string) {
    return this.userService.findUser(userId);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
