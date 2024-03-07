import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './models/payment.model';
import { Admin, AdminSchema } from '../admins/model/admin.model';
import { GroupStudent, GroupStudentSchema } from '../group_student/models/group_student.model';
import { Group, GroupSchema } from '../group/models/group.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Payment.name , schema: PaymentSchema},
    {name: Admin.name , schema: AdminSchema},
    {name: Group.name , schema: GroupSchema},
    {name: GroupStudent.name , schema: GroupStudentSchema},
    ]), JwtModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
