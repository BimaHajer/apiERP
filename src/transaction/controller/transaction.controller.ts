/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { TransactionService } from '../service/transaction.service';
import { TransactionDto } from '../dto/transaction.dto';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionController {
      constructor(private readonly transactionService: TransactionService) {}
    
        @UseGuards(JwtAuthGuard)
        @Get('/')
        @ApiBearerAuth()
        @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
        find(@Query('filter') filter?: FilterDto<TransactionDto>): Promise<[TransactionDto[], number]> {
          return this.transactionService.findTransactions(filter);
        }
    
        @UseGuards(JwtAuthGuard)
        @Post('/')
        @ApiBearerAuth()
        async createTransaction(@Body() TransactionDto: TransactionDto,@User('id') idUser: number) {
          return this.transactionService.createTransaction(TransactionDto,idUser);
        }
    
        @UseGuards(JwtAuthGuard)
        @Patch('/:id')
        @ApiBearerAuth()
        async replaceById(@Param('id') id: number, @Body() TransactionDto: TransactionDto,@User('id') idUser: number) {
          return this.transactionService.replaceById(id,TransactionDto,idUser);
        }
    
        @UseGuards(JwtAuthGuard)
        @Get('/:id')
        @ApiBearerAuth()
        findById(@Param('id') id: number) {
          return this.transactionService.findById(id);
        }
    
        @UseGuards(JwtAuthGuard)
        @Delete('/:id')
        @ApiBearerAuth()
        remove(@Param('id') id: number) {
          return this.transactionService.remove(id);
        }
    
        @UseGuards(JwtAuthGuard)
        @Post('/deleteMultipleTransactions')
        @ApiBearerAuth()
        removeMultiple(@Body() tab: any,@User('id') idUser: number) {
          return this.transactionService.removeMultiple(tab[0], tab[1],idUser);
        }    
}
