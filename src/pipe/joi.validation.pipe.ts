import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

/* Object schema validation */
@Injectable()
export class JoiValidationPipe
  implements PipeTransform<{ value: any; metadate: any }> {
  constructor(private readonly schema: Record<string, any>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const res = await this.schema.validateAsync(value);
      if (res.name) {
        return value;
      }
    } catch (err) {
      throw new BadRequestException('Validation failed!');
    }
  }
}
