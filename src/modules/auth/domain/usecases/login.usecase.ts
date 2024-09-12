import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../data/repositories';
import { AuthResult } from '../models';
import { AuthService } from '../services';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(username: string, password: string): Promise<AuthResult> {
    const userInfo = await this.authRepository.getUserByUsername(username);

    if (!userInfo) return { status: false, message: 'Usuario no encontrado...!!!' };

    const { password: passwordEncrypt } = userInfo;

    const validatePassword = await this.authService.comparePassword(
      password,
      passwordEncrypt,
    );

    if (!validatePassword) return { status: false, message: 'Contraseña incorrecta...!!!' };

    const userInfoToken = {
      idUser: userInfo.id,
      fullName: userInfo.fullName,
    };

    const token = await this.authService.generateUserToken(userInfoToken);

    const loginResult = {
      status: true,
      message: 'Iniciaste Sesión correctamente...!!!',
      data: {
        userInfo: userInfoToken,
        token: token,
      },
    };

    return loginResult;
  }
}
