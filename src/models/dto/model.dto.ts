/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class ModeleDto {
    
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  readonly active?: boolean;
  brandId: any;
}