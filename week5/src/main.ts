import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';

// dotenv 패키지를 직접 사용하는 경우
dotenv.config({
  path: path.resolve(
    (process.env.NODE_ENV === 'production') ? '.production.env'
    : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
  )
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()) // 전역으로 설정하기 위해 부트스트랩 과정에 적용
  await app.listen(3000);
}
bootstrap();