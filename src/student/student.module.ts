import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './models/student.model';
import { Admin, AdminSchema } from '../admins/model/admin.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
    {name: Student.name, schema: StudentSchema},
    {name: Admin.name, schema: AdminSchema},]),
    JwtModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
