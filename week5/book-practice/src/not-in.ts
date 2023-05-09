// 커스텀 유효성 검사기
// 패스워드에 이름 포함 X

import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

export function NotIn(property: string, validationOptions?: ValidationOptions) { // 데커레이터의 인수는 객체에서 참조하려는 다른 속성의 이름과 ValidationOptions를 받는다.
    return (object: Object, propertyName: string) => { // registerDecorator를 호출하는 함수 리턴. 인수로 데커레이터가 선언될 객체와 속성의 이름을 받음
        registerDecorator({ // ValidationDecoratorOptions 객체를 인수로 받음
            name: "NotIn", // 데커레이터 이름
            target: object.constructor, // 데커레이터는 객체가 생성될 때 적용
            propertyName,
            options: validationOptions, // 유효성 옵션은 데커레이터의 인수로 전달받은 걸 사용
            constraints: [property], // 데커레이터가 속성에 적용되도록 제약을 줌
            validator: { // 가장 중요한 유효성 검사 규칙이 validator 속성에 기술된다. 
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return typeof value === 'string' && typeof relatedValue === 'string' && !relatedValue.includes(value);
                }
            }
        })
    }
}