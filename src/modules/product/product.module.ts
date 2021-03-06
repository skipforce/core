import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository'
import { AssetRepository } from '../asset/asset.repository'
import { ProductResolver } from './product.resolver'
import { AuthModule } from '../auth/user/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, AssetRepository]), AuthModule],
  providers: [ProductService, ProductResolver],
  controllers: [ProductController]
})
export class ProductModule { }
