import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { AppService } from '../src/app.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server:any;
  let appService:AppService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = app.get<AppService>(AppService);
    server = app.getHttpServer();
    await app.init();
  });

 
  describe('/ GET',()=>{
    it('shold return  a 403 when an invalid api-key is used', () => {
        return request(server)
          .get('/')
          .set(`x-api-key`,`Invalid`)
          .expect(403);
      });

    it('should return a 403 if no api-key passed',()=>{
      return request(server).get('/').expect(403);
    });

    it('should return a random emoji',()=>{
      // OLD (bug): supertest passes the whole Response object to this callback,
      // and Response has no `data` property, so `data` was undefined.
      // return request(server).get('/').set('x-api-key','my-secret-key').expect(200).expect(({ data }) => {
      //   expect(data.emoji).toBeDefined();
      //   expect(data.browser).toBeDefined();
      // });

      // FIX: the JSON lives on `body`, and TransformResponseInterceptor wraps it
      // in { data: ... }, so the values are at body.data.
      const emojis = appService.getEmojis();
      return request(server).get('/').set('x-api-key','my-secret-key').expect(200).expect(({ body }) => {
        console.log(`body: ${JSON.stringify(body)}`);
        expect(emojis).toContain(body.data.emoji);
        expect(body.data.browser).toBeDefined();
      });
    });

    it('should return respective user-agent',()=>{
      return request(server).get('/').set('x-api-key','my-secret-key').set('user-Agent','insomnia/13.4.0').expect(200).expect(({body})=>{
        const emojis = appService.getEmojis();

        expect(emojis).toContain(body.data.emoji);
        expect(body.data.browser).toBe('insomnia/13.4.0')
      })
    });

    it(`valid index query param returns respective emoji`,()=>{

      const emojis = appService.getEmojis();

      return request(server).get(`/?index=0`).set('x-api-key','my-secret-key').expect(200).expect(({body})=>{
       expect(emojis).toContain(body.data.emoji);
      })
    });

    it(`should return 400 if index is greater then 10`,()=>{
      return request(server).get(`/?index=100`).set('x-api-key','my-secret-key').expect(400);
    })

  });

   // when invalid api key ,returns 403
   //when no apikey return 403
   // / Get should return a random emoji
   // /?index=0 Get should return first emoji
   // /?index=100 should return 400

});
