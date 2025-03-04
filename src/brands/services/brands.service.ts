/* eslint-disable */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { BrandDto } from 'src/brands/dto/brand.dto';
import { Brand } from 'src/brands/entities/brand.entity';
import { parseFilter } from 'src/filter.dto';
import { Model } from 'src/models/entities/model.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  // Récupérer les marques avec un filtre
  async findBrands(filter: any): Promise<[BrandDto[], number]> {
    const options = parseFilter(filter); // Assuming parseFilter handles filtering
    const brandsObjectsAndCount: any = await this.brandRepository.findAndCount(options);
    return brandsObjectsAndCount;
  }

  // Créer une marque
  async createBrand(createBrandDto: BrandDto, idUser: number) {
    console.log('Creating brand with data:', createBrandDto);  // Log the incoming data
    const brand = this.brandRepository.create(createBrandDto);
    let result = await this.brandRepository.save(brand).catch((e) => {
      console.error('Error creating brand:', e);  // Log the error
      throw new BadRequestException('Erreur lors de la création de la marque.');
    });
    return result;
  }

  // Mettre à jour une marque par son ID
  async replaceById(id: any, updateBrandDto: BrandDto, idUser: number) {
    const brand = await this.brandRepository.findOne({ where: { id: +id } });
    if (!brand) {
      throw new NotFoundException(`Marque #${id} non trouvée !`);
    }
    const brandPreload: any = await this.brandRepository.preload({
      id: +id,
      ...updateBrandDto,
    });
    let result = await this.brandRepository.save(brandPreload).catch((e) => {
      throw new BadRequestException('Erreur lors de la mise à jour de la marque.');
    });
    return result;
  }

  // Trouver une marque par ID
  async findById(id: number): Promise<any> {
    return await this.brandRepository.findOne({ where: { id } });
  }

  // Supprimer une marque
  async remove(id: number) {
    return await this.brandRepository.delete(id);
  }

  // Trouver une marque par nom
  async findOne(name: string): Promise<any> {
    return await this.brandRepository.findOne({ where: { name: ILike(name) } });
  }

  // Supprimer plusieurs marques ou les désactiver
  async removeMultiple(toDelete: number[], toDisable: number[], idUser: number) {
    let resultDelete: boolean | null = null;
    let resultDisable: boolean | null = null;
  
    if (toDelete.length !== 0) {
      await this.brandRepository.manager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.update(
          Model, 
          { brandId: In(toDelete) }, 
          { brandId: null } 
        );
  
        const deleteResult = await transactionalEntityManager.delete(Brand, toDelete);
        resultDelete = (deleteResult.affected ?? 0) > 0;
      });
    }
  
    if (toDisable.length !== 0) {
      const updateResult = await this.brandRepository.update(toDisable, { active: false });
      resultDisable = (updateResult.affected ?? 0) > 0;
    }
  
    return resultDelete || resultDisable;
  }
  
}
