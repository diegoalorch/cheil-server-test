import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from '../models/category.model';
import { CreateCategoryDto } from '../dtos/category.dto';
import { AuthGuard } from 'src/modules/auth/presentation/guards';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return this.categoryService.cateogry({ id: Number(id) });
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto): Promise<CategoryModel> {
    return this.categoryService.createCategory(categoryData);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryData: CategoryModel,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory({
      where: { id: Number(id) },
      data: categoryData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCategory(
    @Param('id') id: number,
  ): Promise<{ status: boolean; message: string; data?: any }> {
    const result = await this.categoryService.deleteCategory({ id: Number(id) });

    if (result) {
      return { status: true, message: 'Se ha eliminado una categoria...!' };
    }
  }
}
