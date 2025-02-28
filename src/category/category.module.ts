import { Module } from '@nestjs/common';
import { category } from './entities/category.entity';
import { CategoryService } from './service/category/category.service';
import { CategoryController } from './contoller/category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([category])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [CategoryService, TypeOrmModule.forFeature([category])],
})
export class CategoryModule { }
