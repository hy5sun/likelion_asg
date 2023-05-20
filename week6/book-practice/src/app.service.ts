import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    try {
      this.logger.error('level: error');
      this.logger.error('level: warn');
      this.logger.log('level: log');
      this.logger.verbose('level: verbose');
      this.logger.debug('level: debug');

      return 'Hello World';
    } catch (e) {
      console.log(e);
    }
  }
}
