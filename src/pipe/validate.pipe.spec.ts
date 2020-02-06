import { ValidatePipe } from './validate.pipe';

describe('ValidatePipe', () => {
  it('should be defined', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const schema: Object = {};
    expect(new ValidatePipe(schema)).toBeDefined();
  });
});
