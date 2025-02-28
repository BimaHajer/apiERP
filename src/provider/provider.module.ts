import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provider } from './entities/provider.entity';
import { ProviderService } from './service/provider/provider.service';
import { ProviderController } from './controller/provider/provider.controller';

@Module({
    imports: [TypeOrmModule.forFeature([provider])],
    providers: [ProviderService],
    controllers: [ProviderController]
})
export class ProviderModule {}
