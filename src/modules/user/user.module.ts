import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/configs/prisma.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthService } from '../auth/domain/services';

@Module({
  imports: [PrismaModule], //import prisma module to use prisma service in your module
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}