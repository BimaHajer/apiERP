import { Module } from '@nestjs/common';
import { TvaService } from './service/tva/tva.service';
import { TvaController } from './controller/tva/tva.controller';
import { Tva } from './entities/tva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tva])],
  providers: [TvaService],
  controllers: [TvaController]
})
export class TvaModule {}
