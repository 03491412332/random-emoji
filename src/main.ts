import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { AppConfigService } from './config/app-config.service.js';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const config = app.get(AppConfigService);
  const logger = new Logger('Bootstrap');

  app.use(helmet());

  app.enableCors({
    origin:config.crossOrigins.length > 0? config.crossOrigins:false
  });

  if(config.isProduction){
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
  }
 
  app.enableShutdownHooks();

  void app.listen(config.port,'0.0.0.0');
  logger.log(`App ${config.appVersion} running on port ${config.port}(${config.nodeEnv})`);
}
await bootstrap();
