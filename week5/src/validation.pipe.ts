import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class validationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(metadata);
        return value;
    }
}

/*
* transform의 매개변수 value: 현재 파이프에 전달된 인수 / metadata: 현재 파이프에 전달된 인수의 메타데이터 
* ArgumentMetadata 속 type: 파이프에 전달된 인수가 본문? 쿼리 매개변수? 매개변수? 커스텀 매개변수? 인지 나타냄
metatype: 라우터 핸들러에 정의된 인수의 타입을 알려줌. 핸들러에서 타입을 생략하거나 바닐라 자스를 사용하면 undefined가 된다.
data: 데커레이터에 전달된 문자열. 즉, 매개변수의 이름.

ex) @Param('id', ValidationPipe) id: number 이라는 매개변수를 받는다면 {metatype: [Function: Number], type: 'param', data: 'id'}
*/