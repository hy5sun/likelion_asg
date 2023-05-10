import { IsString } from "class-validator";

export class CreateDmDto {
    @IsString()
    receiver: string; // 메시지 보낼 사람 (닉네임)

    @IsString()
    content: string; // 메시지 내용
}