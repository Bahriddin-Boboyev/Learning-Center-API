import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { redisClientFactory } from './redis-client.factory';

@Module({
  exports: [RedisService],
  providers: [RedisService, redisClientFactory],
})
export class RedisModule {}
