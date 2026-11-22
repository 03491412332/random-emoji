import { Controller, Get, Query,Req } from '@nestjs/common';
import { AppService } from './app.service.js';
import { EmojiValidationPipe } from './common/emoji-validation/emoji-validation.pipe.js';
import { type Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEmoji(@Req() req:Request,@Query('index',EmojiValidationPipe) index?:number) {
    // console.log(`Browser: ${req.headers.browser}`);
    return {emoji:this.appService.getEmoji(index?+index:0),browser:req.headers.browser,};
  }
}
