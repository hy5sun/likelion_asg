import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config'
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['${__dirname}/config/env/.${process.env.NODE_ENV}.env'], // NODE_ENV에 따라 .env 파일의 절대 경로 지정
    load: [emailConfig], // load 속성을 통해 앞에서 구성해둔 ConfigFactory 지정
    isGlobal: true, // 전역 모듈로 동작하게 해서 어느 모듈에서나 사용 가능. 
    validationSchema, //환경 변수의 값에 대해 유효성 검사를 수행하도록 joi를 이용하여 유효성 검사 객체를 작성
  }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: 'sun0130!',
      database: 'week6',
      entities: [__dirname + '/**/*.entity{.ts, .js}'],
      synchronize: true,
    }),
    UsersModule, EmailModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

