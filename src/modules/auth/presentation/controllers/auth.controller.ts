import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../domain/usecases';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async Login(
    @Body()
    authData: {
      username: string;
      password: string;
    },
  ) {
    return this.loginUseCase.execute(authData.username, authData.password);
  }
}
