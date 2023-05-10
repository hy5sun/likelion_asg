import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
