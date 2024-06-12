import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenRefreshMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies['refreshToken'];

    if (!accessToken) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      // Verify access token
      this.jwtService.verify(accessToken, { secret: 'secret_key' });
      next();
    } catch (err) {
      // Access token expired, try refreshing it
      if (err.name === 'TokenExpiredError' && refreshToken) {
        const payload = this.jwtService.decode(accessToken) as {
          username: string;
        };
        if (payload && payload.username) {
          const user = await this.authService.getUserIfRefreshTokenMatches(
            refreshToken,
            payload.username,
          );
          if (user) {
            const tokens = await this.authService.publishRefreshToken(user);
            res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
            req.headers['authorization'] = `Bearer ${tokens.accessToken}`;
            next();
          } else {
            throw new UnauthorizedException('Invalid refresh token');
          }
        } else {
          throw new UnauthorizedException('Invalid access token payload');
        }
      } else {
        throw new UnauthorizedException('Invalid or expired access token');
      }
    }
  }
}
