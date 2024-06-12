import { AuthService } from './auth/auth.service';
import {
  Controller,
  Get,
  Request,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  // private readonly logger = new Logger(AppController.name);

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.login(req.user);
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
