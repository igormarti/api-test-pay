import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/avatar')
  findAvatar(@Param('id') id: string) {
    return this.usersService.findAvatarUserId(id);
  }

  @HttpCode(204)
  @Delete(':id/avatar')
  remove(@Param('id') id: string) {
    return this.usersService.removeAvatarUserId(id);
  }
}
