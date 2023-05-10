import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { DmService } from './dm.service';
import { CreateDmDto } from './dto/create-dm.dto';

@Controller('dm')
export class DmController {
  constructor(private readonly dmService: DmService) {}

  @Post('send')
  create(@Headers('userId') userId: string, @Body() createDmDto: CreateDmDto) {
    return this.dmService.sendDM(userId, createDmDto);
  }

  @Get()
  findAll() {
    return this.dmService.findAllDM();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.dmService.findOneById(userId);
  }
}
