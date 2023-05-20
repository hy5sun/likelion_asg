import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { DmService } from './dm.service';
import { CreateDmDto } from './dto/create-dm.dto';

@Controller('dm')
export class DmController {
  constructor(private readonly dmService: DmService) {}

  @Post('send')
  create(@Headers('userId') userId: string, @Body() createDmDto: CreateDmDto) {
    return this.dmService.sendDm(userId, createDmDto);
  }

  @Get()
  findAll(@Headers('userId') userId: string) {
    return this.dmService.findAllDm(userId);
  }

  @Get(':receiverId') // 수신자
  findOne(
    @Headers('userId') userId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return this.dmService.findOneById(userId, receiverId);
  }
}
