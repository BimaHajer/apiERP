import { Module } from '@nestjs/common';
import { ModelsController } from './controller/models.controller';
import { ModelsService } from './service/models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  imports: [BrandsModule, TypeOrmModule.forFeature([Model])],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
