import { Module } from '@nestjs/common';
import { GroupStudentService } from './group_student.service';
import { GroupStudentController } from './group_student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupStudent, GroupStudentSchema } from './models/group_student.model';
import { Teacher, TeacherSchema } from '../teacher/models/teacher.model';
import { Admin, AdminSchema } from '../admins/model/admin.model';
import { Student, StudentSchema } from '../student/models/student.model';
import { JwtModule } from '@nestjs/jwt';
import { Group, GroupSchema } from '../group/models/group.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: GroupStudent.name, schema: GroupStudentSchema},
    {name:Teacher.name, schema: TeacherSchema}, 
    {name: Admin.name, schema: AdminSchema},
    {name: Student.name, schema: StudentSchema},
    {name: Group.name, schema: GroupSchema},
  ]), JwtModule],
  controllers: [GroupStudentController],
  providers: [GroupStudentService],
})
export class GroupStudentModule {}
