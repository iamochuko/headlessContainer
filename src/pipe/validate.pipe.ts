import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe
  implements PipeTransform<{ value: any; metadate: any }> {
  constructor(private readonly schema: Record<string, any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { err } = this.schema.validate(value);
    if (err) {
      throw new BadRequestException('Validation failed!');
    }
    return value;
  }
}
