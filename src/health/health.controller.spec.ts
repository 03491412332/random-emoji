import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { AppConfigService } from '../config/app-config.service.js';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers:[
        {
          provide:HealthCheckService,
          useValue:{check:vi.fn()}
        },
        {
          provide: MongooseHealthIndicator,useValue:{pingCheck:vi.fn()}
        },{
          provide:AppConfigService,useValue:{appVersion:'test'}
        }
      ]
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
