import { IsString, MaxLength, MinLength, IsDate } from "class-validator";

export class CreatePostDto {
    id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(2200)
    content: string;
    writer: string;
    createdAt: Date;
}
