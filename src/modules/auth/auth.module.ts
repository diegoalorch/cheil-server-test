import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/configs';
import { AuthRepository } from './data/repositories/auth.repository';
import { AuthController } from './presentation/controllers';
import { LoginUseCase } from './domain/usecases';
import { AuthService } from './domain/services';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/jwt/constant';

@Module({
  imports: [PrismaModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: "1h"
    }
  })],
  controllers: [AuthController],
  providers: [AuthRepository, LoginUseCase, AuthService],
})
export class AuthModule {}
