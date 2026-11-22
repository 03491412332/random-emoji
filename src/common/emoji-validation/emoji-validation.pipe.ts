import {  BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value: any) {

    console.log(`The value of queryParametear : ${value}`);
    // OLD (bug): throwing here made the optional `index` query param required,
    // and `!value` is also true for 0, so `?index=0` was rejected as "not defined".
    // if(!value){throw new BadRequestException(`Validation failed: value is not defined`);;}

    // FIX: index is optional, so let a missing value pass through untouched.
    if (value === undefined) return undefined;

    if(isNaN(value)){
      throw new BadRequestException(`Validation failed: ${value} is not a number`);
    }

    // OLD (bug): off-by-one. There are 10 emojis (indexes 0..9), so 10 slipped
    // through validation and emojis[10] returned undefined.
    // if(value<0 || value>10){

    // FIX: the highest valid index is 9.
    if(value<0 || value>9){
      throw new BadRequestException(`Validation failed ${value} is not within range`);
    }
    return value;
  }
}
    