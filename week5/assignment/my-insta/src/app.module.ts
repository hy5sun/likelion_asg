import { SendGridModule } from '@anchan828/nest-sendgrid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { DmModule } from './dm/dm.module';
import emailConfig from './config/emailConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig],
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
      synchronize: false, // 처음에만 true, 다음에는 false
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
  providers: [],
})
export class AppModule {}
