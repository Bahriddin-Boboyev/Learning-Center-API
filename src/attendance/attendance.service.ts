import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../admins/model/admin.model';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './models/attendance.model';
import { Student, StudentDocument } from '../student/models/student.model';
import { GroupStudent, GroupStudentDocument } from '../group_student/models/group_student.model';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private readonly attendanceModel: Model<AttendanceDocument>,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(GroupStudent.name) private readonly groupModel:Model<GroupStudentDocument>,
    private readonly jwtService: JwtService,
    ) {}
  async create(createAttendanceDto: CreateAttendanceDto, refreshToken:string) {
    if(!refreshToken) throw new BadRequestException("Refresh token not provided")
    const decodedToken = this.jwtService.decode(refreshToken);
    const admin = await this.adminModel.findOne({ _id: decodedToken['id']});
    const group = await this.groupModel.findOne({group_id:createAttendanceDto.group_id});
    if (!group) throw new BadRequestException("Group not found");
    if (group.student_id != createAttendanceDto.student_id) throw new BadRequestException("Student not found");
    if (!admin) throw new BadRequestException("Admin not found");
    return this.attendanceModel.create({...createAttendanceDto, admin_id: admin._id});
  }

  findAll() {
    return this.attendanceModel.find().populate('group_id');
  }

  findOne(id: string) {
    return this.attendanceModel.find({group_id: id}).populate('student_id');
  }

  update(updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceModel.findOneAndUpdate({group_id: updateAttendanceDto.group_id, student_id: updateAttendanceDto.student_id}, updateAttendanceDto, {new: true});
  };

}
