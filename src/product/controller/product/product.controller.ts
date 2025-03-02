import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { ProductService } from 'src/product/service/product/product.service';
import { User } from 'src/shared/shared.service';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiBearerAuth()
    @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
    find(@Query('filter') filter?: FilterDto<ProductDto>): Promise<[ProductDto[], number]> {
      return this.productService.findProducts(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @ApiBearerAuth()
    async createProduct(@Body() ProductDto: ProductDto,@User('id') idUser: number) {
      return this.productService.createProduct(ProductDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    @ApiBearerAuth()
    async replaceById(@Param('id') id: number, @Body() ProductDto: ProductDto,@User('id') idUser: number) {
      return this.productService.replaceById(id,ProductDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiBearerAuth()
    findById(@Param('id') id: number) {
      return this.productService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
      return this.productService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/deleteMultipleProducts')
    @ApiBearerAuth()
    removeMultiple(@Body() tab: any,@User('id') idUser: number) {
      return this.productService.removeMultiple(tab[0], tab[1],idUser);
    }    
}
