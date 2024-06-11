import {
  Controller,
  Get,
  // HttpException,
  // HttpStatus,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getHello(@Ip() ip: string): string {
    // console.log(ip);
    this.logger.log(ip);

    this.configService.get('ENVIRONMENT');
    return this.appService.getHello();
    //throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  // path parameter로 변수를 받는 법
  @Get('name/:name')
  getName(@Param('name') name: string): string {
    return `${name} hello`;
  }

  // query string으로 변수를 받는 법
  @Get('name')
  getNameByQuery(@Query('name') name: string): string {
    return `${name} hello by Query`;
  }
}
