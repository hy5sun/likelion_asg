import { Module } from '@nestjs/common';
import { LoggerModule } from './logging/logger.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
