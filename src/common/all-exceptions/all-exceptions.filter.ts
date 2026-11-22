import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const request =host.switchToHttp().getRequest(); 
    const response = host.switchToHttp().getResponse<Response>();
     const isHttpException = exception instanceof HttpException;
       response.status(isHttpException?exception.getStatus():500);
     response.json({
      message:isHttpException?exception['message']:'Internal server error',
      statusCode:isHttpException?exception.getStatus():500,
      timestamp: new Date().toISOString(),
      path:request.url, 
    })
  }
}
