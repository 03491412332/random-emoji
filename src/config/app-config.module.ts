import { Global,Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppConfigService } from "./app-config.service.js";
import { envSchema } from "./env.schema.js";

@Global()
@Module({
    imports:[
        ConfigModule.forRoot({
            cache:true,
            ignoreEnvFile: process.env.NODE_ENV === 'production',
            validationSchema:envSchema
        })
    ],
    providers:[AppConfigService],
    exports:[AppConfigService],
})
export class AppConfigModule {}
