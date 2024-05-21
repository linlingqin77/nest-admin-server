/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const Custom = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );


import { SetMetadata } from "@nestjs/common";

export const  RequireLogin = () => SetMetadata('require-login', true);