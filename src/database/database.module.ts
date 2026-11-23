import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppConfigService } from "../config/app-config.service.js";

@Module({
    imports:[
        MongooseModule.forRootAsync({
            inject: [AppConfigService],
            useFactory:(config:AppConfigService) => ({
                uri:config.mongodbUri,
                serverSelectionTimeoutMS: 5000,
        }),
            }),
    ],
})

export class DatabaseModule{}