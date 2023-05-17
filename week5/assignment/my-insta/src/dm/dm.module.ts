import { Module } from '@nestjs/common';
import { DmService } from './dm.service';
import { DmController } from './dm.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmEntity } from './entities/dm.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([DmEntity])],
  controllers: [DmController],
  providers: [DmService],
})
export class DmModule {}
