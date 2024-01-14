import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bull";
import { BullModule } from '@nestjs/bull';

@Injectable()
export class RedisQueue {
  logger = new Logger("RedisQueue");

  constructor(@InjectQueue("redis-queue") private redisQueue: Queue) {
    this.init();
  }

  async init() {
    try {
      await this.delay(1000, 1);
      this.checkQueueAvailability();
    } catch (e) {
      this.logger.error(e);
    }
  }

  private checkQueueAvailability(): void {
    if (this.redisQueue.client.status === "ready") {
      this.logger.log("connected to redis successfully");
    } else {
        this.logger.error("filed to connect to redis")
      process.kill(process.pid, 'SIGTERM');

    }
  }

  delay(t: number, val: any) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(val);
      }, t);
    });
  }
}

const RedisLoggerQueueConnection = BullModule.registerQueue({ name: 'redis-queue' })
 
export default RedisLoggerQueueConnection