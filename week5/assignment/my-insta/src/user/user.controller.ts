import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get(':userId')
  async findUser(@Param('userId') userId: string) {
    return this.userService.findUser(userId);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
