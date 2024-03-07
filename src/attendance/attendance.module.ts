import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './models/attendance.model';
import { Admin, AdminSchema } from '../admins/model/admin.model';
import { Group, GroupSchema } from '../group/models/group.model';
import { Student, StudentSchema } from '../student/models/student.model';
import { JwtModule } from '@nestjs/jwt';
import { GroupStudent, GroupStudentSchema } from '../group_student/models/group_student.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Attendance.name , schema: AttendanceSchema},
    {name: Admin.name , schema: AdminSchema},
    {name: GroupStudent.name , schema: GroupStudentSchema},
    ]), JwtModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
