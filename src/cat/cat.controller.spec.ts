import { Test, TestingModule } from '@nestjs/testing';

import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { ICat } from 'src/interface';

describe('Cat Controller', () => {
  let controller: CatController;
  let catService: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService],
    }).compile();

    catService = module.get<CatService>(CatService);
    controller = module.get<CatController>(CatController);
    //let o = await module.resolve(CatService)
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return an array of cats', async () => {
      const res: ICat[] = [{ name: 'test', age: 24, breed: 'Trifth' }];
      jest.spyOn(catService, 'findAll').mockImplementation(() => res);

      expect(await catService.findAll()).toBe(res);
    });
  });
});
