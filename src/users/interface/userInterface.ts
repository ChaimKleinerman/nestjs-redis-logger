import { Document } from 'mongoose';

export interface UserModel extends Document {
  name: string;
  userName: string;
  email: string;
  age: number;
  password: string;
  gender: 'm' | 'f' | 'u';
}


