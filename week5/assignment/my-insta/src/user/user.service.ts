import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(private readonly emailService: EmailService) {}

  async sendEmail(email: string) {
    return await this.emailService.send(email);
  }
}
