import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/configs';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Product service');

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    this.logger.log('ProductById');
    const product = await this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
    return product;
  }

  async getAllProducts(page: number, pageSize: number) {
    this.logger.log('getAllProducts');
    const skip = (page - 1) * pageSize;

    const products = await this.prisma.product.findMany({
      skip: skip,
      take: pageSize,
    });

    return products;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    this.logger.log('createProduct');

    const createProduct = await this.prisma.product.create({
      data,
    });

    return createProduct;
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    this.logger.log('updateProduct');
    const updateProduct = await this.prisma.product.update({
      where: params.where,
      data: params.data,
    });
    return updateProduct;
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    this.logger.log('deleteProduct');
    const deleteProduct = await this.prisma.product.delete({
      where,
    });
    return deleteProduct;
  }
}