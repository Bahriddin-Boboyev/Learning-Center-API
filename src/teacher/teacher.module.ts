import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './models/teacher.model';
import { Subject, SubjectSchema } from '../subject/models/subject.model';
import { Admin, AdminSchema } from '../admins/model/admin.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    {name:Teacher.name, schema: TeacherSchema}, 
    {name: Subject.name, schema: SubjectSchema},
    {name: Admin.name, schema: AdminSchema},
  ]), JwtModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
