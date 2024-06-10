import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Ip = createParamDecorator(
  (_data: unknown, _ctx: ExecutionContext): string => {
    const request = _ctx.switchToHttp().getRequest();
    return request.ip;
  },
);
