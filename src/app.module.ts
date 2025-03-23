/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';
import { ProviderModule } from './provider/provider.module';
import { ProductModule } from './product/product.module';
import { TvaModule } from './tva/tva.module';
import { ClientModule } from './client/client.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image/image.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true, // À utiliser uniquement en développement
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProviderModule,
    TvaModule,
    ProductModule,
    SharedModule,
    ClientModule,
    BrandsModule,
    ModelsModule,
    RoleModule,
    ImageModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
