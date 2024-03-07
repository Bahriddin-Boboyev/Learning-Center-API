import {FactoryProvider}  from '@nestjs/common'
import { createClient } from 'redis';
import { REDIS_CLIENT, RedisClient } from './redis-cliend.type'


export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
    provide: REDIS_CLIENT,
    useFactory: async ()=> {
        const  url = process.env.REDIS_URL 
        const client = createClient({url:url});
        await client.connect()
        return client
    }
}