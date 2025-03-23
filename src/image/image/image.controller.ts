/* eslint-disable */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/shared.service';

@Controller('images')
@ApiTags('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/imageMultiple/add/upload')
  @ApiBearerAuth()
  uploadMultipleImageAndCreateImages(
    @Body() data: any,
    @User('id') idUser: number,
  ) {
    return this.imageService.uploadMultipleImageAndCreateImages(data, idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  @ApiBearerAuth()
  removeImageFromCloudinaryAndBdd(@Body() image: any) {
    return this.imageService.removeImageFromCloudinaryAndBdd(image);
  }
}