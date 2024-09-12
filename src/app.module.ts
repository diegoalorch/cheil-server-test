import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user';
import { PrismaModule } from './common/configs';
import { ProductModule } from './modules/product';
import { AuthModule } from './modules/auth';
import { CategoryModule } from './modules/category';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
