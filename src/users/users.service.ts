import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../interface/userInterface';
import { CreateMongooseUserDto } from 'src/dto/create-mongoose-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel('User') private UserModel: Model<UserModel>,
  ) {}

  async createUser(createMongooseUserDto: CreateMongooseUserDto) {
    const user = new this.UserModel(createMongooseUserDto);
    return await user.save();

  }
async findAllUsers(){
  const users = await this.UserModel.find().exec()
  return users
}

  async findOneUser(id: string) {
    const user = await this.UserModel.findById(id).exec();
    return user;
  }

  removeUser(id: string) {
    return this.UserModel.deleteOne({ _id: id }).exec();
  }
}
