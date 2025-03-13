import { Module } from '@nestjs/common';
import { RoleController } from './controller/role/role.controller';
import { RoleService } from './service/role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports: [RoleModule, TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
