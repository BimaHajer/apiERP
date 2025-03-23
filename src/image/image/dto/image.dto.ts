/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";

export class ImageDto {
  @ApiProperty()
  readonly label?: string;

  @ApiProperty()
  path?: string;

  @ApiProperty()
  readonly productId?: number;

  @ApiProperty()
  readonly createdAt?: Date | null;
}
