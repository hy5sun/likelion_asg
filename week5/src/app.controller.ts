import { Request } from 'express';
import { Controller, Get, Req, HttpCode, Body, Param, Patch, BadRequestException, Header, Redirect, Delete, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { ConfigService } from '@nestjs/config';


@Controller()
export class AppController {
  usersService: any;
  constructor(private readonly configService: ConfigService,) {}

  @Get('/db-host-from-config')
  getDatabaseHostFromConfigService(): string {
    return this.configService.get('DATABASE_HOST');
  }

  @Get('/hello') //http://localhost:3000/hello로 접속 가능 | he*lo 라고 쓰면 가운데 어떤 문자가 와도 상관없이 라우팅 패스를 구성하겠다는 뜻.
  getHello(): string {
    return process.env.DATABASE_HOST;
  }

  @Get()
  findAll(@Res() res) {
    const users = this.usersService.findAll()

    return res.status(200).send(users);
  }

  // 상태코드 바꾸기 
  @HttpCode(202)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // 예외처리
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
    }
    return this.usersService.findOne(+id);
  }

  // 응답에 커스텀 헤더 추가: 인수로 헤더 이름과 값을 받음.
  @Header('Custom', 'Test Header')
  @Get(':id')
  findOneWithHeader(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // 리디렉션
  @Redirect('https://nestjs.com', 301)
  @Get(':id')
  findOne1(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // // 쿼리 매개변수로 버전 숫자를 전달받아 해당 버전의 페이지로 이동 예제
  // @Get('redirect/docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // getDocs(@Query('version') version) {
  //   if (version && version === '5') {
  //     return {url: 'https://docs.nestjs.com/v5/'}
  //   }
  // }

  // 라우트 매개변수 : 경로를 구성하는 매개변수
  // 1. 매개변수가 여러 개 전달될 경우 객체로 한 번에 받기. (But params 타입이 any가 되어 권장X)
  @Delete(':userId/memo/:memoId')
  deleteUserMemo(@Param() params: {[key: string]: string}) {
    return 'userId: ${params.userId}, memoId: ${params.memoId}';
  }

  // 일반적인 방법: 라우팅 매개변수를 따로 받음
  @Delete(':userId/memo/:memoId')
  deleteUserMemo2(
    @Param('userId') userId: string,
    @Param('memoId') memoId: string,
    ) {
      return 'userId: ${userId}, memoId: ${memoId}';
  }
}
