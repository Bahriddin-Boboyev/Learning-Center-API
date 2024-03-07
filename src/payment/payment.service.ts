import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../admins/model/admin.model';
import { GroupStudent, GroupStudentDocument } from '../group_student/models/group_student.model';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../group/models/group.model';
import { Payment, PaymentDocument } from './models/payment.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(GroupStudent.name) private readonly groupStudentModel:Model<GroupStudentDocument>,
    @InjectModel(Group.name) private readonly groupModel:Model<GroupDocument>,
    private readonly jwtService: JwtService,
    ) {}
  async create(createPaymentDto: CreatePaymentDto, refreshToken:string) {
    if(!refreshToken) throw new BadRequestException("Refresh token not provided")
    const decodedToken = this.jwtService.decode(refreshToken);
    const admin = await this.adminModel.findOne({ _id: decodedToken['id']});
    if (!admin) throw new BadRequestException("Admin not found");
    const group = await this.groupStudentModel.findOne({group_id:createPaymentDto.group_id});
    if (!group) throw new BadRequestException("Group not found");
    if (group.student_id != createPaymentDto.student_id) throw new BadRequestException("Student not found");
    const group1 = await this.groupModel.findOne({_id: createPaymentDto.group_id});
    if (group1.payment_month != createPaymentDto.payment) {
      throw new ForbiddenException("Payment not enought or lot")
    }
    return this.paymentModel.create({...createPaymentDto, admin_id: admin.id})
  }

  findOne(id: string) {
    return this.paymentModel.find({group_id: id})
  }


  remove(id: string) {
    return this.paymentModel.findByIdAndRemove(id);
  }

  
}
