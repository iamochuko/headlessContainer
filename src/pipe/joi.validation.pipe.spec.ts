import { JoiValidationPipe } from './joi.validation.pipe';

describe('JoiValidationPipe', () => {
  it('should be defined', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const schema: Object = {};
    expect(new JoiValidationPipe(schema)).toBeDefined();
  });
});
