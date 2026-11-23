import { Controller,Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { AppConfigService } from '../config/app-config.service.js';

@Controller('health')
export class HealthController {

    constructor(
        private readonly health:HealthCheckService,
        private readonly mongoose:MongooseHealthIndicator,
        private readonly config: AppConfigService){}

    @Get('live')
    @HealthCheck()
    live(){
        return this.health.check([]);
    }

    @Get()
    @HealthCheck()
    async ready(){
        const result = await this.health.check([
            ()=> this.mongoose.pingCheck('mongodb'),
        ]);

        return {
            ...result,
            version:this.config.appVersion,
            uptime:Math.round(process.uptime())
        };
    }

}
