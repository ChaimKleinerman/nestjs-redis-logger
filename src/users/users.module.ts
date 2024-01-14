import { Logger, Module, OnModuleInit, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CacheModule } from '../dal/connectToRedis';
import MongodbModule, { UserCollectionModule } from '../dal/MongodbModule';
import { RedisQueue } from 'src/dal/queue';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [CacheModule, MongodbModule, UserCollectionModule, BullModule.registerQueue({ name: 'some-queue' })],
  controllers: [UsersController],
  providers: [UsersService, RedisQueue],
})

export class UsersModule  {
  
  }

