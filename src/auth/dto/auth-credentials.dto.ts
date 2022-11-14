import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

// eslint-disable-next-line prettier/prettier
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/;

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6, {
    message: 'UserName is too short. Minimum length is 6 characters',
  })
  @MaxLength(20, {
    message: 'UserName is too long. Maximal length is 20 characters',
  })
  username: string;

  @MinLength(6, {
    message: 'Password is too short. Minimum length is 6 characters',
  })
  @Matches(passwordRegex, {
    message: 'Password must contain at least 1 number, 1 UpperCaseLater',
  })
  password: string;
}
