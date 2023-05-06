import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./http-exception.filter";
import { Module, Logger } from "@nestjs/common";

@Module({
    providers: [ // HttpExceptionFilter와 주입받을 Logger를 프로바이더로 선언한다.
        Logger,
        {provide: APP_FILTER, useClass: HttpExceptionFilter},
    ],
})
export class ExceptionModule {}