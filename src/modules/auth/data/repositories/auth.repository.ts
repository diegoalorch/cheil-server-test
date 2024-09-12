import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/configs';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User repository');

  async getUserByUsername(username: string): Promise<User | null> {
    this.logger.log('userByUsername');
    const userInfo = await this.prisma.user.findUnique({
      where: { username },
    });
    return userInfo;
  }
}
