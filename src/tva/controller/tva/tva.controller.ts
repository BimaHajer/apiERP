import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { tvaDto } from 'src/tva/dto/tva.dto';
import { TvaService } from 'src/tva/service/tva/tva.service';

@Controller('tva')
@ApiTags('tva')
export class TvaController {
constructor(private readonly tvaService: TvaService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiBearerAuth()
    @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
    find(@Query('filter') filter?: FilterDto<tvaDto>): Promise<[tvaDto[], number]> {
      return this.tvaService.findTva(filter);
    }

    @UseGuards(JwtAuthGuard) 
    @Post('/')
    @ApiBearerAuth()
    async createTva(@Body() tvaDto: tvaDto,@User('id') idUser: number) {
      return this.tvaService.createTva(tvaDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    @ApiBearerAuth()
    async replaceById(@Param('id') id: number, @Body() tvaDto: tvaDto,@User('id') idUser: number) {
      return this.tvaService.replaceById(id, tvaDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiBearerAuth()
    findById(@Param('id') id: number) {
      return this.tvaService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
      return this.tvaService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/deleteMultipleTva')
    @ApiBearerAuth()
    removeMultiple(@Body() tab: any,@User('id') idUser: number) {
      return this.tvaService.removeMultiple(tab[0], tab[1],idUser);
    }
}
