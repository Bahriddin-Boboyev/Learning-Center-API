import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsModule } from './admins/admins.module';
import { SubjectModule } from './subject/subject.module';
import { TeacherModule } from './teacher/teacher.module';
import { GroupModule } from './group/group.module';
import { StudentModule } from './student/student.module';
import { GroupStudentModule } from './group_student/group_student.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PaymentModule } from './payment/payment.module';
import { FreezeModule } from './freeze/freeze.module';



@Module({
  imports: [
  ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
  MongooseModule.forRoot(process.env.DB_URL),
  AdminsModule,
  SubjectModule,
  TeacherModule,
  GroupModule,
  StudentModule,
  GroupStudentModule,
  AttendanceModule,
  PaymentModule,
  FreezeModule,

],
  controllers: [],
  providers: [],
})
export class AppModule {}
