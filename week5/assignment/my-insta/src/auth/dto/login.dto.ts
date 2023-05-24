import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  userId: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^7*()]{8, 30}$/)
  password: string;
}
