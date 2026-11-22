import { CanActivate, ExecutionContext, Injectable,} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private readonly logger:LoggerService){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(`Guard checking authentication.....`);
    this.logger.info(`Guard checking authentication.....`);
   
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    if(apiKey !== 'my-secret-key'){
      console.log('Guard: faile authentication');
      return false;
    }
    this.logger.info(`Guard: passed authentication.....`);
    return true;
   
  }
}
