import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
@Post()

createUser(@Body() user){
  return this.usersService.createUser(user)
}

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Get()
  findAllUsers(){
    return this.usersService.findAllUsers()

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('this is id in controller ', id)
    return this.usersService.removeUser(id);
  }
}
