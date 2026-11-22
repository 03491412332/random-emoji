import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LoggerMiddleware } from './common/logger/logger.middleware.js';
import { LoggerService } from './logger.service.js';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/auth/auth.guard.js';
import { BrowserInterceptor } from './common/browser/browser.interceptor.js';
import { TransformResponseInterceptor } from './common/transform-response/transform-response.interceptor.js';
import { AllExceptionsFilter } from './common/all-exceptions/all-exceptions.filter.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'random-emoji',
    }),
  ],
  controllers: [AppController],

  /**
   *  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new BrowserInterceptor());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter()); 
   */


  providers: [AppService, LoggerService,{
    provide: APP_GUARD,
    useClass:AuthGuard
  },{
    provide:APP_INTERCEPTOR,
    useClass:BrowserInterceptor,
  },{
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor
  },{
    provide:APP_FILTER,
    useClass: AllExceptionsFilter
  }],
})
export class AppModule implements NestModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
