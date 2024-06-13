/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/routes/user/user.service';
import { compare } from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private refreshTokens: { [key: string]: string } = {}; // In-memory storage

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new HttpException('WRONG CREDENTIALS', HttpStatus.NOT_FOUND);
    }
    const result = await compare(password, user.password);

    if (!result) {
      throw new HttpException('WRONG PASSWORD', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async login(user: User) {
    // const { username, password } = user;
    // const payload = await this.validateUser(username, password);
    const accessToken = this.jwtService.sign({ ...user });
    const refreshToken = this.jwtService.sign({ ...user }, { expiresIn: '7d' });
    return { ...user, accessToken, refreshToken };
  }

  async refreshToken(user: any) {
    const { iat, exp, ...payload } = user;
    const accessToken = this.jwtService.sign({ ...payload });
    const refreshToken = this.jwtService.sign(
      { ...payload },
      { expiresIn: '7d' },
    );
    return { accessToken, refreshToken };
  }
}
