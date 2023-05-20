import { Injectable } from '@nestjs/common';
import { MyLogger } from './logging/my-logger.service';

@Injectable()
export class AppService {
  constructor(private myLogger: MyLogger) {}

  getHello(): string {
    this.myLogger.error('level: error');
    this.myLogger.error('level: warn');
    this.myLogger.log('level: log');
    this.myLogger.verbose('level: verbose');
    this.myLogger.debug('level: debug');

    return 'Hello World';
  }
}
