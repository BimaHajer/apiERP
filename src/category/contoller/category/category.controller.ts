import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CategoryService } from 'src/category/service/category/category.service';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiBearerAuth()
    @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
    find(@Query('filter') filter?: FilterDto<CategoryDto>): Promise<[CategoryDto[], number]> {
      return this.categoryService.findCategories(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @ApiBearerAuth()
    async createCategory(@Body() CategoryDto: CategoryDto,@User('id') idUser: number) {
      return this.categoryService.createCategory(CategoryDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    @ApiBearerAuth()
    async replaceById(@Param('id') id: number, @Body() CategoryDto: CategoryDto,@User('id') idUser: number) {
      return this.categoryService.replaceById(id, CategoryDto,idUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiBearerAuth()
    findById(@Param('id') id: number) {
      return this.categoryService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @ApiBearerAuth()
    remove(@Param('id') id: number) {
      return this.categoryService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/deleteMultipleCategories')
    @ApiBearerAuth()
    removeMultiple(@Body() tab: any,@User('id') idUser: number) {
      return this.categoryService.removeMultiple(tab[0], tab[1],idUser);
    }
}
