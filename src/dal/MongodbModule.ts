import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../dto/entities/mongoose-user.entity';

const MongodbModule =  MongooseModule.forRoot('mongodb://localhost/nest')

export const UserCollectionModule =   MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])


export default MongodbModule