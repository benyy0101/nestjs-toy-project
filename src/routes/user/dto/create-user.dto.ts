import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @MinLength(8)
  @MaxLength(10)
  @IsNotEmpty()
  username: string;
  @MinLength(8)
  @MaxLength(10)
  @IsNotEmpty()
  password: string;
  @MinLength(8)
  @MaxLength(10)
  @IsNotEmpty()
  name: string;

  //   @IsEmail()
  //   email?: string;

  //   @IsPhoneNumber('KR')
  //   IsPhoneNumber?: string;
}
