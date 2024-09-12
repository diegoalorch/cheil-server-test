import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/configs';
import { Prisma, User } from '@prisma/client';
import { AuthService } from 'src/modules/auth/domain/services';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  private logger = new Logger('UserService');

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    this.logger.log('userById');
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
      return user;
    } catch (error) {
      this.logger.error(`Error finding user: ${error.message}`);
      throw new HttpException(
        'Error finding user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsers() {
    this.logger.log('getAllUsers');
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`);
      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(data: CreateUserDto): Promise<User> {
    this.logger.log('createUser');
    try {
      const passwordEncrypt = await this.authService.encryptPassword(
        data.password,
      );

      const userData = {
        ...data,
        password: passwordEncrypt,
      };

      const createUser = await this.prisma.user.create({
        data: userData,
      });

      return createUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    this.logger.log('updateUser');
    try {
      const passwordEncrypt = await this.authService.encryptPassword(
        params.data.password?.toString(),
      );

      const userData = {
        ...params.data,
        password: passwordEncrypt,
      };
      
      const updateUser = await this.prisma.user.update({
        where: params.where,
        data: userData,
      });
      return updateUser;
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      throw new HttpException(
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log('deleteUser');
    try {
      const deleteUser = await this.prisma.user.delete({
        where,
      });

      return deleteUser;
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`);
      throw new HttpException(
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
