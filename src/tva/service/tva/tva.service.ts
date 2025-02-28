import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { tvaDto } from 'src/tva/dto/tva.dto';
import { Tva } from 'src/tva/entities/tva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TvaService {
  constructor(
    @InjectRepository(Tva)
    private readonly tvaRepository: Repository<Tva>,
  ) {}
  async findTva(filter: any): Promise<[tvaDto[], number]> {
      const options = parseFilter(filter);
      const tvaObjectsAndCount: any = await this.tvaRepository.findAndCount(options);
      return await tvaObjectsAndCount;
    }
  async createTva(createTvaDto: tvaDto,idUser: number) {
      createTvaDto.createdBy = idUser;
      const tva = this.tvaRepository.create(createTvaDto);
      return await this.tvaRepository.save(tva).catch((e) => {
        throw new BadRequestException("Une erreur s'est produite lors de la création de tva");
      });
  }
  async replaceById(id: number, updateTvaDto: tvaDto,idUser:number) {
          const tva = await this.tvaRepository.findOne({ where: { id: +id } });
          if (!tva) {
              throw new NotFoundException(`tva #${id} introuvable !`);
          }
          const tvaPreload = await this.tvaRepository.preload({
              id: +id,
              ...updateTvaDto,
              updatedBy: idUser,
              updatedAt: new Date()
          });
      
          if (!tvaPreload) {
              throw new BadRequestException("Une erreur s'est produite lors de la mise à jour de tva");
          }
          return await this.tvaRepository.save(tvaPreload);
      }
    async findById(id: number): Promise<Tva> {
        const tva = await this.tvaRepository.findOne({ where: { id } });
    
        if (!tva) {
            throw new NotFoundException(`tva avec l'ID ${id} introuvable`);
        }
        return tva;
    }
                    
    async remove(id: number) {
      return await this.tvaRepository.delete(id);
    }
    async removeMultiple(toDelete: number[], toDisable: number[], idUser?: number) {
        let resultDelete: boolean | null = null
        let resultDisable: boolean | null = null
        if (toDelete.length != 0) {
          if (await this.tvaRepository.delete(toDelete)) {
            resultDelete = true
          } else
          resultDelete = false
        }
        if (toDisable.length != 0) {
          if (await this.tvaRepository.update(toDisable, { updatedBy: idUser, updatedAt: new Date()})) {
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
