import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  priceDiscount: number;

  @IsNotEmpty()
  quantity: number;

  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  imageUrl: string;

  @IsString()
  status: string;
}
