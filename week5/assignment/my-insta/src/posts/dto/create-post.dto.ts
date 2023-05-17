import { IsString, MaxLength, MinLength, IsNumber } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;
}
