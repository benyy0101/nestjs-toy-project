import { IsNotEmpty, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
