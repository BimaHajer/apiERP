/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  readonly amout?: number;

  @ApiProperty()
  readonly ban?: string;

  @ApiProperty()
  readonly isCompleted?: boolean;

  @ApiProperty()
  readonly isCredit?: boolean;

  @ApiProperty()
  readonly isOver?: boolean;

  @ApiProperty()
  readonly sourceId?: number;

  @ApiProperty()
  readonly operationNumber?: number;

  @ApiProperty()
  readonly dueDate?: Date;

  @ApiProperty()
  readonly active?: boolean;

  @ApiProperty()
  readonly createdAt?: Date;

  @ApiProperty()
  readonly updatedAt?: Date;

  @ApiProperty()
  readonly updatedBy?: number;

  @ApiProperty()
  readonly deletedAt?: Date;

  createdBy?: number;

}
