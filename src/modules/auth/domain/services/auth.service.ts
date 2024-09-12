import { compare, hash } from 'bcrypt';
import { UserInfo } from '../models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async encryptPassword(password: string): Promise<string> {
    const encryptValue = await hash(password, 10);
    return encryptValue;
  }

  async comparePassword(
    password: string,
    passwordEncrypt: string,
  ): Promise<boolean> {
    const matchPassword = await compare(password, passwordEncrypt);

    return matchPassword;
  }

  async generateUserToken(authData: UserInfo): Promise<string> {
    const token = this.jwtService.signAsync(authData);

    return token;
  }
}
