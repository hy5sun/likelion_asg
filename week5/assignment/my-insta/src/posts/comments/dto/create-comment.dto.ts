import { IsString, MinLength } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsString()
  @MinLength(2)
  @MinLength(30)
  writerId: string;

  @IsString()
  postId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
