import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CategoryDto {
  @ApiProperty()

  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  picture?: string;

  createdBy?: number;
}
