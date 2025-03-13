import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
 constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async findRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}
