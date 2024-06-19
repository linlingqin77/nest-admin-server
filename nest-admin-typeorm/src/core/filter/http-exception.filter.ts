// src/filter/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      Request original url: ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      Status code: ${status}
      Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      `;
    Logger.info(logFormat);
    // console.log(exception.getResponse().message[]);n


    response.status(status).json({
      code: 1,
      // statusCode: status,
      // error: exception.message,
      msg: exception.message,
      //   error: exception,
      error: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    });
  }
}
