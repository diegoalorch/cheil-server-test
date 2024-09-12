import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../common/configs/prisma.service';
import { ProductService } from '../services/product.service';

describe('Unit Test Product', () => {
  let unitTestProduct: ProductService;
  let prismaService: PrismaService; // Mock del PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService, // Asegúrate de proporcionar PrismaService como un mock
          useValue: {
            product: {
              findMany: jest.fn(), // Mock del método findMany de Prisma
            },
          },
        },
      ],
    }).compile();

    unitTestProduct = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService); // Obtener el PrismaService simulado
  });

  describe('Service', () => {
    it('Test GET Products', async () => {
      const result = [
        {
          id: 2,
          categoryId: 2,
          name: 'Laptop 2024',
          description: 'Algo aqui',
          price: 3.5,
          priceDiscount: 3.5,
          quantity: 100,
          imageUrl: 'https://www.google.com/algo.jpg',
          status: 'Activo',
          createdAt: new Date('2024-09-10T21:08:12.642Z'),
          updatedAt: new Date('2024-09-10T21:08:12.642Z'),
        },
      ];

      jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(result);

      const products = await unitTestProduct.getAllProducts(1, 2);

      expect(products).toBe(result);

      expect(prismaService.product.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
