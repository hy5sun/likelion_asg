import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  userId: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^7*()]{8, 30}$/)
  password: string;

  @IsString()
  signupVerifyToken: string;
}
