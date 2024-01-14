import { PartialType } from '@nestjs/mapped-types';
import { CreateMongooseUserDto } from './create-mongoose-user.dto';

export class UpdateMongooseUserDto extends PartialType(CreateMongooseUserDto) {}
