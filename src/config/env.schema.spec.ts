import { describe,expect,it } from "vitest";
import { envSchema } from "./env.schema.js";

describe('envSchema',()=>{

    const valid = {MONGODB_URI:'mongodb://localhost:27017/test'};

    it('fills in the defaults',()=>{
        const env = envSchema.parse(valid);

        expect(env.NODE_ENV).toBe('development');
        expect(env.PORT).toBe(3000);
        expect(env.APP_VERSION).toBe('dev');
        expect(env.CORS_ORIGINS).toEqual([])
    });

    it(`turns text into the right types`,()=>{
        const env = envSchema.parse({
            ...valid,
            PORT:'8080',
            CORS_ORIGINS:'http://a.com, http://b.com',
        });

        expect(env.PORT).toBe(8080);
        expect(env.CORS_ORIGINS).toEqual(['http://a.com','http://b.com']);
    });

    it(`accepts a MongoDb Atlas address`,()=>{
        const result = envSchema.safeParse({
            MONGODB_URI:'mongodb+srv://user:pass@cluster0.example.net/app',
        });
        expect(result.success).toBe(true);
    });

    it('refuses a missing MongoDB_URI',()=>{
        expect(()=>envSchema.parse({})).toThrow();
    });

    it(`refuses a PORT that is not a number`,()=>{
        expect(()=>envSchema.parse({...valid,PORT:'abc'})).toThrow();

    });

    it(`refuses an unknown NODE_ENV`,()=>{
        expect(()=>envSchema.parse({...valid,NODE_ENV:'prod'}))
    });

})