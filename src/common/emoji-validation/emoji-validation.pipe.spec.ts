import { BadRequestException } from '@nestjs/common';
import { EmojiValidationPipe } from './emoji-validation.pipe.js';

describe('EmojiValidationPipe', () => {

  const emojiPipe = new EmojiValidationPipe();
  it('should be defined', () => {
    expect(emojiPipe).toBeDefined();
  });
  
  // OLD (bug): `result` was the arrow function itself, not the pipe's return value,
  // so toBeUndefined() always saw a function and failed. Wrapping in `() => ...`
  // is only needed for toThrow(), where Vitest must call the function itself.
  // it(`should return undfined if no value isd passed in`,()=>{
  //   const result = ()=> emojiPipe.transform(undefined);
  //   expect(result).toBeUndefined();
  // });

  // FIX: call the pipe directly and check what it returns.
  it(`should return undefined if no value is passed in`,()=>{
    const result = emojiPipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it(`should throw the bad exception error if the value is not a number`,()=>{
    const result = ()=> emojiPipe.transform('not a number');
    expect(result).toThrow(BadRequestException);
  });

  it(`should return a BadRequest Exception if value is less then 0`,()=>{
    const result =()=> emojiPipe.transform(-1);
    expect(result).toThrow(BadRequestException);
  });

  it(`should return a BadRequest Exception if value is greater then 10`,()=>{
    const result = ()=>emojiPipe.transform(10);
    expect(result).toThrow(BadRequestException);
  });

  it(`should return a true if value is valid `,()=>{
    const result = emojiPipe.transform(1);
    expect(result).toEqual(1);
  })
});
