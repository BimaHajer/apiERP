/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionDto } from '../dto/transaction.dto';
import { parseFilter } from 'src/filter.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findTransactions(filter: any): Promise<[TransactionDto[], number]> {
    const options = parseFilter(filter);
    const transactionsObjectsAndCount: any =
      await this.transactionRepository.findAndCount(options);
    return transactionsObjectsAndCount;
  }

  async createTransaction(
    createTransactionDto: TransactionDto,
    idUser: number,
  ) {
    createTransactionDto.createdBy = idUser;
    const transaction = this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.save(transaction).catch((e) => {
      throw new BadRequestException(
        "Une erreur s'est produite lors de la création de la transaction",
      );
    });
  }

  async replaceById(
    id: number,
    updateTransactionDto: TransactionDto,
    idUser: number,
  ) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: +id },
    });
    if (!transaction) {
      throw new NotFoundException(`transaction #${id} introuvable !`);
    }
    const transactionPreload = await this.transactionRepository.preload({
      id: +id,
      ...updateTransactionDto,
      updatedBy: idUser,
      updatedAt: new Date(),
    });
    if (!transactionPreload) {
      throw new BadRequestException(
        "Une erreur s'est produite lors de la mise à jour de transaction",
      );
    }
    return await this.transactionRepository.save(transactionPreload);
  }

  async findById(id: number): Promise<Transaction> {
    const category = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Transaction avec l'ID ${id} introuvable`);
    }
    return category;
  }

  async remove(id: number) {
    return await this.transactionRepository.delete(id);
  }

  async removeMultiple(
    toDelete: number[],
    toDisable: number[],
    idUser?: number,
  ) {
    let resultDelete: boolean | null = null;
    let resultDisable: boolean | null = null;
    if (toDelete.length != 0) {
      if (await this.transactionRepository.delete(toDelete)) {
        resultDelete = true;
      } else resultDelete = false;
    }
    if (toDisable.length != 0) {
      if (
        await this.transactionRepository.update(toDisable, {
          updatedBy: idUser,
          updatedAt: new Date(),
        })
      ) {
        resultDisable = true;
      } else resultDisable = false;
    }
    if (
      ((toDelete.length != 0 && resultDelete == true) ||
        (toDelete.length == 0 && resultDelete == null)) &&
      ((toDisable.length != 0 && resultDisable == true) ||
        (toDisable.length == 0 && resultDisable == null))
    ) {
      return true;
    } else return false;
  }
}
