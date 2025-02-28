import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { providerDto } from 'src/provider/dto/provider.dto';
import { ProviderService } from 'src/provider/service/provider/provider.service';
import { User } from 'src/shared/shared.service';

@Controller('providers')
@ApiTags('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  find(@Query('filter') filter?: FilterDto<providerDto>): Promise<[providerDto[], number]> {
    return this.providerService.findProviders(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createProvider(@Body() providerDto: providerDto,@User('id') idUser: number) {
    return this.providerService.createProvider(providerDto,idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBearerAuth()
  async replaceById(@Param('id') id: number, @Body() providerDto: providerDto, @User('id') idUser: number) {
    return this.providerService.replaceById(id, providerDto,idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findById(@Param('id') id: number) {
    return this.providerService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.providerService.remove(id);
  }

  @UseGuards(JwtAuthGuard) 
  @Post('/deleteMultipleProvider')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any,@User('id') idUser: number) {
    return this.providerService.removeMultiple(tab[0], tab[1],idUser);
  }
}
