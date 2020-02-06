import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CatService } from '../src/cat/cat.service';
import { CatModule } from '../src/cat/cat.module';

describe('Cat', () => {
  let app: INestApplication;
  const catService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [CatModule],
    })
      .overrideProvider(CatService)
      .useValue(catService)
      .compile();

    app = modRef.createNestApplication(); // instantiate a full Nest runtime environment
    await app.init();
  });

  it('/GET cat', () => {
    // simulate HTTP tests
    return request(app.getHttpServer())
      .get('/cat')
      .expect(200)
      .expect({ data: catService.findAll() });
  });

  afterAll(async () => {
    await app.close();
  });
});
