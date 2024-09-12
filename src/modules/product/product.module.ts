import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/configs/prisma.module';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [PrismaModule], //import prisma module to use prisma service in your module
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}