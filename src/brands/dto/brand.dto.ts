/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class BrandDto {
  @ApiProperty()
  readonly name: string;   

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  readonly picture?: string;

  @ApiProperty()
  @Transform(({ value }) => value === 'true' || value === true)
  readonly active?: boolean;
  
}
