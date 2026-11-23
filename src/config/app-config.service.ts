import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Env } from "./env.schema.js";

@Injectable()
export class AppConfigService{
    constructor(private readonly config:ConfigService<Env,true>){}

    get nodeEnv():Env['NODE_ENV']{
        return this.config.get('NODE_ENV',{infer:true});
    }

    get isProduction():boolean{
        return this.nodeEnv === 'production';
    }

    get port():number{
        return this.config.get('PORT',{infer:true});
    }

    get appVersion():string{
        return this.config.get('APP_VERSION',{infer:true});
    }

    get mongodbUri():string{
        return this.config.get('MONGODB_URI',{infer:true});
    }

    get crossOrigins():string[]{
        return this.config.get('CORS_ORIGINS',{infer:true});
    }
}