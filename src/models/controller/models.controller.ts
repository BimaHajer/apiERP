/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { ModeleDto } from '../dto/model.dto';
import { ModelsService } from '../service/models.service';

@Controller('models')
@ApiTags('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({name: 'filter',type: 'object', schema: { $ref: getSchemaPath(FilterDto) },})
  find(@Query('filter') filter?: FilterDto<ModeleDto>,): Promise<[ModeleDto[], number]> {
    return this.modelsService.findModeles(filter);
  }



  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createModele(@Body() modeleDto: ModeleDto, @User('id') idUser: number) {
    return this.modelsService.createModele(modeleDto, idUser);
  }



  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBearerAuth()
  async replaceById(
    @Param('id') id: number,
    @Body() modeleDto: ModeleDto,
    @User('id') idUser: number,
  ) {
    return this.modelsService.replaceById(id, modeleDto, idUser);
  }



  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findById(@Param('id') id: number) {
    return this.modelsService.findById(id);
  }



  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.modelsService.remove(id);
  }

  
  @UseGuards(JwtAuthGuard)
  @Post('/deleteMultipleModels')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any, @User('id') idUser: number) {
    return this.modelsService.removeMultiple(tab[0], tab[1], idUser);
  }
}
