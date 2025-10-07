import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadUser } from 'src/auth/types/payload-usr.type';

export const User = createParamDecorator(
  (data: keyof PayloadUser, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: PayloadUser }>();
    const user = request.user;

    if (!user) {
      return undefined;
    }

    return data ? user[data] : user;
  },
);
