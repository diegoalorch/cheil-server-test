import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { ProductService } from '../services/product.service';
  import { CreateProductDto } from '../dtos/product.dto';
  import { ProductModel } from '../models/product.model';
import { AuthGuard } from 'src/modules/auth/presentation/guards';
  
  @Controller('product')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @UseGuards(AuthGuard)
    @Get()
    async getAllProducts(
      @Query('page') page: number,
      @Query('pageSize') pageSize: number
    ) {
      return this.productService.getAllProducts(Number(page), Number(pageSize));
    }
  
    @UseGuards(AuthGuard)
    @Get(':id')
    async getProduct(@Param('id') id: number) {
      return this.productService.product({ id: Number(id) });
    }
  
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @Post()
    async createProduct(
      @Body()
      productData: CreateProductDto,
    ) {
      return this.productService.createProduct(productData);
    }
  
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() productData: ProductModel) {
      return this.productService.updateProduct({
        where: { id: Number(id) },
        data: productData,
      });
    }
  
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
      return this.productService.deleteProduct({ id: Number(id) });
    }
  }