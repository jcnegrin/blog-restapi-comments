import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CreateComment = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.body;
  },
);