import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-cliend.type';


@Injectable()
export class RedisService implements OnModuleDestroy {

  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: RedisClient) {}

  onModuleDestroy() {
    this.redisClient.quit()

  }

  ping() {
    return this.redisClient.ping()
  }

  async set(key: string,value: string) {
    try {
      
      const otp_exp = process.env.OTP_EXP
      await this.redisClient.set(key, value, {EX:+otp_exp})
      return true
    } catch (error) {  
      return false
    }
  }

  async get (key: string) {
    const retrievedValue = await this.redisClient.get(key);
    return retrievedValue
  }


}
