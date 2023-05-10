import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    @MinLength(1)
    @MaxLength(2200)
    content: string;
}
