import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { CategoryDto } from 'src/category/dto/category.dto';
import { category } from 'src/category/entities/category.entity';
import { parseFilter } from 'src/filter.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
      @InjectRepository(category)
      private readonly categoryRepository: Repository<category>,
    ) {}

    async findCategories(filter: any): Promise<[CategoryDto[], number]> {
      const options = parseFilter(filter);
      const categoriesObjectsAndCount: any = await this.categoryRepository.findAndCount(options);
      return categoriesObjectsAndCount;
    }

    async createCategory(createCategoryDto: CategoryDto,idUser: number) {
      createCategoryDto.createdBy = idUser;
      const category = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(category).catch((e) => {
        throw new BadRequestException("Une erreur s'est produite lors de la création de la catégorie");
      });
    }
                    
    async replaceById(id: number, updateCategoryDto: CategoryDto,idUser: number) {
        const category = await this.categoryRepository.findOne({ where: { id: +id } });
        if (!category) {
            throw new NotFoundException(`Catégorie #${id} introuvable !`);
        }
        const categoryPreload = await this.categoryRepository.preload({
            id: +id,
            ...updateCategoryDto,
            updatedBy: idUser,
            updatedAt: new Date(),
        });
        if (!categoryPreload) {
            throw new BadRequestException("Une erreur s'est produite lors de la mise à jour de la catégorie");
        }
        return await this.categoryRepository.save(categoryPreload);
    }
                    
    async findById(id: number): Promise<category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
    
        if (!category) {
            throw new NotFoundException(`Catégorie avec l'ID ${id} introuvable`);
        }
        return category;
    }
                    
    async remove(id: number) {
      return await this.categoryRepository.delete(id);
    }

    async removeMultiple(toDelete: number[], toDisable: number[], idUser?: number) {
        let resultDelete: boolean | null = null
        let resultDisable: boolean | null = null
        if (toDelete.length != 0) {
          if (await this.categoryRepository.delete(toDelete)) {
            resultDelete = true
          } else
          resultDelete = false
        }
        if (toDisable.length != 0) {
          if (await this.categoryRepository.update(toDisable, { updatedBy: idUser, updatedAt: new Date()})) {
            resultDisable = true
          } else
            resultDisable = false
          }
          if (((toDelete.length != 0 && resultDelete == true) || (toDelete.length == 0 && resultDelete == null)) &&
            ((toDisable.length != 0 && resultDisable == true) || (toDisable.length == 0 && resultDisable == null))) {
              return true
            } else
          return false
      }
}
