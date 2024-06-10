import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(ip);
    return this.appService.getHello();
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
