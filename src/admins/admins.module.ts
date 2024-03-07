import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admin, AdminSchema } from './model/admin.model';

import { TokensModule } from '../tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '../redis/redis.module';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
  MongooseModule.forFeature([{name:Admin.name, schema: AdminSchema}]),
  TokensModule,
  JwtModule,
  RedisModule,
  SmsModule,
],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
