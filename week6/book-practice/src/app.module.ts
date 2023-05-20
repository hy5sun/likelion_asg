import { Module } from '@nestjs/common';
import { LoggerModule } from './logging/logger.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

@Module({
  imports: [
    LoggerModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'producton' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
