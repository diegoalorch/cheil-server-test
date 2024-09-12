import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/configs';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})

export class CategoryModule {}
