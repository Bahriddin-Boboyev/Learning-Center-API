import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './models/group.model';
import { Teacher, TeacherSchema } from '../teacher/models/teacher.model';
import { Subject } from 'rxjs';
import { Admin, AdminSchema } from '../admins/model/admin.model';
import { SubjectSchema } from '../subject/models/subject.model';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [MongooseModule.forFeature([
    {name: Group.name, schema: GroupSchema},
    {name:Teacher.name, schema: TeacherSchema}, 
    {name: Subject.name, schema: SubjectSchema},
    {name: Admin.name, schema: AdminSchema},
  ]), JwtModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
