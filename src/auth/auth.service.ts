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
      throw new HttpException('NO VALIDATE USER', HttpStatus.NOT_FOUND);
    }

    const result = await compare(password, user.password);

    if (result) return user;
    else return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Store refresh token in memory
    this.refreshTokens[user.username] = refreshToken;

    return {
      accessToken,
      refreshToken,
    };
  }

  async publishRefreshToken(user: User) {
    const payload = {
      username: user.username,
      name: user.name,
    };

    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Update refresh token in memory
    this.refreshTokens[user.username] = newRefreshToken;

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user || this.refreshTokens[username] !== refreshToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
