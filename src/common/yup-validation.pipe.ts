import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BaseSchema } from 'yup';

@Injectable()
export class YupValidationPipe<ReturnType> implements PipeTransform {
  constructor(private schema: BaseSchema) {}

  async transform(value: any): Promise<ReturnType> {
    try {
      await this.schema.validate(value);
      return this.schema.cast(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
