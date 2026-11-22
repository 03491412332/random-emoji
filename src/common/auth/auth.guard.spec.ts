import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard.js';
import { createMock } from '@golevelup/ts-vitest';
import { LoggerService } from '../../logger.service.js';
describe('AuthGuard', () => {
  const authGuard = new AuthGuard(new LoggerService());
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it(`should return true if the api-key is valid`,()=>{
    const context = createMock<ExecutionContext>({
      switchToHttp:()=>({
        getRequest:()=>( {
            header:()=>`my-secret-key`
        }),
      })
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it(`should return false if the api-key is undefined`,()=>{
    const context = createMock<ExecutionContext>({
      switchToHttp:()=>({
        getRequest:()=>({
          header: ()=> undefined
        })
      })
    });

    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });

  it(`should return false if api-key is invalid`,()=>{
    const context = createMock<ExecutionContext>({
      switchToHttp:()=>({
        getRequest:()=>({
          header:()=> `INVALID`
        })
      })
    });
    const result  = authGuard.canActivate(context);
    expect(result).toBe(false);
  })
});
