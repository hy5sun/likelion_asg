import { IsString, MaxLength, MinLength, IsDate, IsNumber } from "class-validator";

export class CreatePostDto {
    @IsNumber()
    id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(2200)
    content: string;

    @IsString()
    @MinLength(2)
    @MinLength(30)
    writer: string;

    @IsDate()
    createdAt: Date;
}
