import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';

import LoginUserDto from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(data: CreateUserDto) {
    const { username, name, password } = data;
    const salt = 11;
    const encryptedPassword = await hash(password, salt);
    const newUser = this.userRepository.create({
      username,
      name,
      password: encryptedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async login(data: LoginUserDto) {
    const { username, password } = data;
    const user = await this.getUserByUsername(username);
    if (!user) throw new HttpException('NOT A MEMBER', HttpStatus.NOT_FOUND);
    const payload = {
      username,
      name: user.name,
    };

    const result = await compare(password, user.password);
    if (result) {
      const accessToken = jwt.sign(payload, 'secret_key', {
        expiresIn: 60 * 60,
      });
      return {
        accessToken,
      };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({
      username,
    });
  }
}
