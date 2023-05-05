import { Inject, Injectable } from '@nestjs/common';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor(
        @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,  // @Inject 토큰을 앞서 만든 ConfigFactory의 KEY인 'email' 문자열로 넣어준다.
    ) {
        this.transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass,
            }
        });
    }

    async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
        const baseUrl = this.config.baseUrl; //.env 파일에 있는 값 사용

        const url = '${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}';

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
            <form action="${url}" method="POST">
                <button>가입확인</button>
            </form>
            `
        }

        return await this.transporter.sendMail(mailOptions);
    }

}
