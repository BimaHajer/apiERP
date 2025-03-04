/* eslint-disable */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FilterDto } from 'src/filter.dto';
import { ClientDto } from 'src/client/dto/client.dto';
import { ClientService } from 'src/client/service/client.service';
import { User } from 'src/shared/shared.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('clients')
@ApiTags('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

 @UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiBearerAuth()
    @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
    find(@Query('filter') filter?: FilterDto<ClientDto>): Promise<[ClientDto[], number]> {
        return this.clientService.findClients(filter);
    }

 @UseGuards(JwtAuthGuard)
    @Post('/')
    @ApiBearerAuth()
    async createClient(@Body() clientDto: ClientDto, @User('id') idUser: number) {
        return this.clientService.createClient(clientDto,idUser);
    }

 @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    @ApiBearerAuth()
    async replaceById(@Param('id') id: number, @Body() clientDto: ClientDto , @User('id') idUser: number) {
        return this.clientService.replaceById(id, clientDto,idUser);
    }

     @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiBearerAuth()
    findById(@Param('id') id: number) {
        return this.clientService.findById(id);
    }
 @UseGuards(JwtAuthGuard)

    @Delete('/:id')
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
        return this.clientService.remove(id);
    }
 @UseGuards(JwtAuthGuard)

    @Post('/deleteMultipleClients')
    @ApiBearerAuth()
    removeMultiple(@Body() tab: any , @User('id') idUser: number) {
        return this.clientService.removeMultiple(tab[0], tab[1], idUser);
    }
}
