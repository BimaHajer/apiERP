/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { ILike, Repository } from 'typeorm';
import { ModeleDto } from '../dto/model.dto';
import { Model } from '../entities/model.entity';


@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modeleRepository: Repository<Model>,
  ) {}
  async findModeles(filter: any): Promise<[ModeleDto[], number]> {
    const options = parseFilter(filter);

    const modelesObjectsAndCount: any = await this.modeleRepository.findAndCount(options);
  
    return modelesObjectsAndCount;
  }
  

  async createModele(createModeleDto: ModeleDto, idUser: number) {
    const modele = this.modeleRepository.create(createModeleDto);
    return this.modeleRepository.save(modele);
}



async replaceById(id: any, updateModeleDto: ModeleDto, idUser: number) {
  console.log('Mise à jour de la modèle avec ID:', id); 
  const modele = await this.modeleRepository.findOne({ where: { id: +id } });
  if (!modele) {
    throw new NotFoundException(`Modele #${id} not found!`);
  }

  const modelePreload: any = await this.modeleRepository.preload({
    id: +id,
    ...updateModeleDto,
  });
  console.log('Modèle pré-chargée avant la sauvegarde:', modelePreload); 
  return this.modeleRepository.save(modelePreload);
}



  async findById(id: number): Promise<any> {
    const modele: any = await this.modeleRepository.findOne({
      where: { id: id }, relations: ['brandId']
    });

    return modele
  }

  async remove(id: number) {
    return await this.modeleRepository.delete(id)
  }

  async findOne(name: string): Promise<any> {
    return await this.modeleRepository.findOne({ where: { name: ILike(name) } });
  }
  

  async removeMultiple(toDelete: number[], toDisable: number[], idUser?: number) {
    let resultDelete: boolean | null = null
    let resultDisable: boolean | null = null
    if (toDelete.length != 0) {
      if (await this.modeleRepository.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
    }
    if (toDisable.length != 0) {
      if (await this.modeleRepository.update(toDisable, { updatedBy: idUser, updatedAt: new Date(), active: false })) {
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