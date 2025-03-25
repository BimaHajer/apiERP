import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment/payment.controller';
import { PaymentService } from './service/payment/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}