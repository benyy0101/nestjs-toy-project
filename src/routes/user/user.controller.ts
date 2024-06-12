import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  singup(@Body(new ValidationPipe()) data: CreateUserDto) {
    return this.userService.signup(data);
  }
  @Post('login')
  login(@Body(new ValidationPipe()) data: LoginUserDto) {
    return this.userService.login(data);
  }
}
