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
