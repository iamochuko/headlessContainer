import { FinderMiddleware } from './finder.middleware';

describe('FinderMiddleware', () => {
  it('should be defined', () => {
    expect(new FinderMiddleware()).toBeDefined();
  });
});
