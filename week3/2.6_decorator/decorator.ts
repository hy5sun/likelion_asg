// 유저 생성 요청의 본문을 데이터 전송 객체(DTO)로 표현
class CreateUserDto {
    @IsEmail()
    @MaxLength(60)
    readonly email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8, 30}$/)
    readonly password: string;
}

function deco(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('데커레이터가 평가됨');
}

class TestClass {
    @deco
    test() {
        console.log('함수 호출됨')
    }
}

const t = new TestClass();
t.test();
/* 결과:
데커레이터가 평가됨
함수 호출됨 */

function deco1(value: string) {
    console.log('데커레이터가 평가됨');
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(value);
    }
}

class TestClass1 {
    @deco('HELLO')
    test() {
        console.log('함수 호출됨')
    }
}

/* 출력결과:
데커레이터가 평가됨
HELLO
함수 호출됨됨
 */