import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class ProductDto {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  readonly tva?: number;

  @ApiProperty()
  readonly priceTTC: number;

  @ApiProperty()
  readonly priceHT: number;

  @ApiProperty()
  readonly initialQuantity: number;

  @ApiProperty()
  readonly remainingQuantity: number;

  @ApiProperty()
  picture?: string;

  @ApiProperty()
  readonly categoryId?: number;

  createdBy?: number;
}
