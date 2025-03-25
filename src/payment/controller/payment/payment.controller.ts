import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { PaymentDto } from 'src/payment/dto/payment.dto';
import { PaymentService } from 'src/payment/service/payment/payment.service';
import { User } from 'src/shared/shared.service';

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiBearerAuth()
    @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
    find(@Query('filter') filter?: FilterDto<PaymentDto>): Promise<[PaymentDto[], number]> {
      return this.paymentService.findPayments(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @ApiBearerAuth()
    async createPayment(@Body() PaymentDto: PaymentDto,@User('id') idUser: number) {
      return this.paymentService.createPayment(PaymentDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    @ApiBearerAuth()
    async replaceById(@Param('id') id: number, @Body() PaymentDto: PaymentDto,@User('id') idUser: number) {
      return this.paymentService.replaceById(id,PaymentDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiBearerAuth()
    findById(@Param('id') id: number) {
      return this.paymentService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
      return this.paymentService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/deleteMultiplePayments')
    @ApiBearerAuth()
    removeMultiple(@Body() tab: any,@User('id') idUser: number) {
      return this.paymentService.removeMultiple(tab[0], tab[1],idUser);
    }
}
