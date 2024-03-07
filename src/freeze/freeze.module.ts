import { Module } from '@nestjs/common';
import { FreezeService } from './freeze.service';
import { FreezeController } from './freeze.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Freeze, FreezeSchema } from './models/freeze.model';
import { Admin, AdminSchema } from '../admins/model/admin.model';
import { GroupStudent, GroupStudentSchema } from '../group_student/models/group_student.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Freeze.name , schema: FreezeSchema},
    {name: Admin.name , schema: AdminSchema},
    {name: GroupStudent.name , schema: GroupStudentSchema},
    ]), JwtModule],
  controllers: [FreezeController],
  providers: [FreezeService],
})
export class FreezeModule {}
