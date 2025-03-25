import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { PaymentDto } from 'src/payment/dto/payment.dto';
import { Payment } from 'src/payment/entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(
      @InjectRepository(Payment)
      private readonly paymentRepository: Repository<Payment>,
    ) {}

    async findPayments(filter: any): Promise<[PaymentDto[], number]> {
      const options = parseFilter(filter);
      const paymentsObjectsAndCount: any = await this.paymentRepository.findAndCount(options);
      return paymentsObjectsAndCount;
    }
    
    async createPayment(createPaymentDto: PaymentDto,idUser: number) {
      createPaymentDto.createdBy = idUser;
      const payment = this.paymentRepository.create(createPaymentDto);
      return await this.paymentRepository.save(payment).catch((e) => {
        throw new BadRequestException("Une erreur s'est produite lors de la création de mode de paiement");
      });
    }
                    
    async replaceById(id: number, updatePaymentDto: PaymentDto,idUser: number) {
        const payment = await this.paymentRepository.findOne({ where: { id: +id } });
        if (!payment) {
            throw new NotFoundException(`mode de paiement #${id} introuvable !`);
        }
        const paymentPreload = await this.paymentRepository.preload({
            id: +id,
            ...updatePaymentDto,
            updatedBy: idUser,
            updatedAt: new Date(),
        });
        if (!paymentPreload) {
            throw new BadRequestException("Une erreur s'est produite lors de la mise à jour de mode de paiement");
        }
        return await this.paymentRepository.save(paymentPreload);
    }
                    
    async findById(id: number): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({ where: { id }});
        if (!payment) {
            throw new NotFoundException(`mode de paiement avec l'ID ${id} introuvable`);
        }
        return payment;
    }
                    
    async remove(id: number) {
      return await this.paymentRepository.delete(id);
    }

    async removeMultiple(toDelete: number[], toDisable: number[], idUser?: number) {
        let resultDelete: boolean | null = null
        let resultDisable: boolean | null = null
        if (toDelete.length != 0) {
          if (await this.paymentRepository.delete(toDelete)) {
            resultDelete = true
          } else
          resultDelete = false
        }
        if (toDisable.length != 0) {
          if (await this.paymentRepository.update(toDisable, {active: false, updatedBy: idUser, updatedAt: new Date()})) {
            resultDisable = true
          } else
            resultDisable = false
          }
          if (((toDelete.length != 0 && resultDelete == true) || (toDelete.length == 0 && resultDelete == null)) &&
            ((toDisable.length != 0 && resultDisable == true) || (toDisable.length == 0 && resultDisable == null))) {
              return true
            } else
          return false
    }
}
