/* eslint-disable */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
    ) {}

    async findProducts(filter: any): Promise<[ProductDto[], number]> {
      const options = parseFilter(filter);
      const productsObjectsAndCount: any = await this.productRepository.findAndCount(options);
      return productsObjectsAndCount;
    }
    
    async createProduct(createProductDto: ProductDto,idUser: number) {
      createProductDto.createdBy = idUser;
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product).catch((e) => {
        throw new BadRequestException("Une erreur s'est produite lors de la création de produit");
      });
    }
                    
    async replaceById(id: number, updateProductDto: ProductDto,idUser: number) {
        const product = await this.productRepository.findOne({ where: { id: +id } });
        if (!product) {
            throw new NotFoundException(`Produit #${id} introuvable !`);
        }
        const productPreload = await this.productRepository.preload({
            id: +id,
            ...updateProductDto,
            updatedBy: idUser,
            updatedAt: new Date(),
        });
        if (!productPreload) {
            throw new BadRequestException("Une erreur s'est produite lors de la mise à jour de produit");
        }
        return await this.productRepository.save(productPreload);
    }
                    
    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } ,relations: ['categoryId','modelId','modelId.brandId', 'images']});
        if (!product) {
            throw new NotFoundException(`Produit avec l'ID ${id} introuvable`);
        }
        return product;
    }
                    
    async remove(id: number) {
      return await this.productRepository.delete(id);
    }

    async removeMultiple(toDelete: number[], toDisable: number[], idUser?: number) {
        let resultDelete: boolean | null = null
        let resultDisable: boolean | null = null
        if (toDelete.length != 0) {
          if (await this.productRepository.delete(toDelete)) {
            resultDelete = true
          } else
          resultDelete = false
        }
        if (toDisable.length != 0) {
          if (await this.productRepository.update(toDisable, { updatedBy: idUser, updatedAt: new Date()})) {
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
