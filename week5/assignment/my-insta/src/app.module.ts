import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { DmModule } from './dm/dm.module';
import emailConfig from './config/emailConfig';
import { AuthGuard } from './auth/auth.guard';
import authConfig from './config/authConfig';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    ConfigModule.forRoot({
      load: [emailConfig, authConfig],
      isGlobal: true,
    }),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true, // 처음에만 true, 다음에는 false
      autoLoadEntities: true,
      charset: 'utf8mb4',
      logging: true,
      keepConnectionAlive: true,
    }),
    UserModule,
    EmailModule,
    AuthModule,
    PostsModule,
    DmModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
