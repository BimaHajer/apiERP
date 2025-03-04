/* eslint-disable */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { BrandDto } from 'src/brands/dto/brand.dto';
import { BrandsService } from 'src/brands/services/brands.service';
import { User } from 'src/shared/shared.service';

@Controller('brands')
@ApiTags('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  async find(@Query('filter') filter?: FilterDto<BrandDto>): Promise<[BrandDto[], number]> {
    return this.brandService.findBrands(filter);
  }

 @UseGuards(JwtAuthGuard)
 @Post('/')
@ApiBearerAuth()
async createBrand(@Body() brandDto: BrandDto,idUser: number) {
  return this.brandService.createBrand(brandDto,idUser); 
}


 @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBearerAuth()
  async replaceById(@Param('id') id: number, @Body() brandDto: BrandDto,idUser: number) {
    return this.brandService.replaceById(id, brandDto,idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  async findById(@Param('id') id: number) {
    return this.brandService.findById(id);
  }

 @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  async remove(@Param('id') id: number) {
    return this.brandService.remove(id);
  }

 @UseGuards(JwtAuthGuard)
  @Post('/deleteMultipleBrands')
  @ApiBearerAuth()
  async removeMultiple(@Body() tab: any, @User('id') idUser: number) {
    return this.brandService.removeMultiple(tab[0], tab[1],idUser);
  }
}
