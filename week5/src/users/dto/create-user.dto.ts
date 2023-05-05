import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @Transform(({value, obj}) => {
        if (obj.password.includes(obj.name.trim())) { // trim()함수를 통해 공백 제거 (name의 앞뒤에 공백이 포함되면 안 된다고 가정)
            throw new BadRequestException('password는 name과 같은 문자열을 포함할 수 없습니다.');
        }
        return value.trim();
    })
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(60)
    readonly email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8, 30}$/)
    readonly password: string;
}
