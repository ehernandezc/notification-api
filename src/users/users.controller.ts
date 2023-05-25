import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get()
  async getUsers() {
    try {
      return await this.usersService.getUsers();
    } catch(err) {
      throw new InternalServerErrorException(err, 'Error ocurred trying to retrieve users');
    }
  }
}