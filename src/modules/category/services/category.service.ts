import { Injectable, Logger } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/configs';
import { CreateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Category service');

  async cateogry(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    this.logger.log('cateogryById');
    const category = await this.prisma.category.findFirst({
      where: categoryWhereUniqueInput,
    });
    return category;
  }

  async getAllCategories() {
    this.logger.log('getAllCategories');
    const products = await this.prisma.category.findMany();
    return products;
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    this.logger.log('createCategory');

    const createProduct = await this.prisma.category.create({
      data,
    });

    return createProduct;
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    this.logger.log('updateCategory');
    const updateCategory = await this.prisma.category.update({
      where: params.where,
      data: params.data,
    });
    return updateCategory;
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category> {
    this.logger.log('deleteCategory');
    const deleteCategory = await this.prisma.category.delete({
      where,
    });
    return deleteCategory;
  }
}
