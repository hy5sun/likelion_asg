// 예외가 발생할 때 모든 예외를 잡아서 요청 URL과 예외가 발생한 시각을 콘솔에 출력하는 예외 필터

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch() // 처리되지 않은 모든 예외를 잡으려고 할 때 사용
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private logger: Logger) {}
    
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        const stack = exception.stack;

        if (!(exception instanceof HttpException)) { // HttpException이 아닌 에러는 알 수 없는 에러이므로 InternalServerErrorException 처리
            exception = new InternalServerErrorException();
        }

        const response = (exception as HttpException).getResponse();

        const log = {
            Timestamp: new Date(),
            url: req.url,
            response,
            stack,
        }

        this.logger.log(log);

        res
        .status((exception as HttpException).getStatus())
        .json(response);
    }
}