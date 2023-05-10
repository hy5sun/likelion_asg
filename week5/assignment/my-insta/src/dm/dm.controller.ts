import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DmService } from './dm.service';
import { CreateDmDto } from './dto/create-dm.dto';

@Controller('dm')
export class DmController {
  constructor(private readonly dmService: DmService) {}

  @Post('send')
  create(@Body() createDmDto: CreateDmDto) {
    return this.dmService.sendDM(createDmDto);
  }

  @Get()
  findAll() {
    return this.dmService.findAllDM();
  }

  @Get(':nickname')
  findOne(@Param('nickname') nickname: string) {
    return this.dmService.findOneById(nickname);
  }
}
