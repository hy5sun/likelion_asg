import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [EmailModule, UserModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
