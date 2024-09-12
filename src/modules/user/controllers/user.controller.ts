import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.user({ id: Number(id) });
  }

  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UserModel,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ status: boolean, message: string, data?: any}> {
    const result = await this.userService.deleteUser({ id: Number(id) });

    if (result) {
      return { status: true, message: "Se ha eliminado un usuario...!"}
    };
  }
}
