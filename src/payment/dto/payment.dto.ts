import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class PaymentDto {

  @ApiProperty()
  readonly modePayment?: string;

  @ApiProperty()
  readonly description?: string;

  createdBy?: number;
}
