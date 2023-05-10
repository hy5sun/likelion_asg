import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('send-email')
  async sendEmail(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    return await this.userService.sendEmail(email);
  }
}
