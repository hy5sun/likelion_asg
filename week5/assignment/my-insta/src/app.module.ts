import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
