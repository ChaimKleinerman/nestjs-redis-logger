import { Logger, Module, OnModuleInit, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CacheModule } from './dal/connectToRedis';
import MongodbModule, { UserCollectionModule } from './dal/MongodbModule';
import RedisLoggerQueueConnection, { RedisQueue } from 'src/dal/queue';

@Module({
  imports: [CacheModule, MongodbModule, UserCollectionModule, RedisLoggerQueueConnection],
  controllers: [UsersController],
  providers: [UsersService, RedisQueue],
})

export class AppModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}


export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req, res, next) {
    const start = new Date();
    const { method, originalUrl } = req;
    res.on('finish', () => {
      const end = new Date();
      const duration = end.getTime() - start.getTime();
      const statusCode = res.statusCode;
      const statusMessage = res.statusMessage; 

      statusCode >= 400 ?
        this.logger.error(`${method} ${originalUrl} - ${statusCode} - ${duration}ms ${statusMessage}`)
      :
        this.logger.log(`${method} ${originalUrl} - ${duration}ms`);
      
    })

    next();
  }
}
