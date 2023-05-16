import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [EmailModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
