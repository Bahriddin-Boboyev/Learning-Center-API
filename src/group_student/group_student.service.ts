import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGroupStudentDto } from './dto/create-group_student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GroupStudent, GroupStudentDocument } from './models/group_student.model';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../student/models/student.model';
import { Group, GroupDocument } from '../group/models/group.model';

@Injectable()
export class GroupStudentService {
  constructor(
    @InjectModel(GroupStudent.name) private readonly groupStudentModel:Model<GroupStudentDocument>,
    @InjectModel(Student.name) private readonly studentModel:Model<StudentDocument>,
    @InjectModel(Group.name) private readonly groupModel:Model<GroupDocument>,
    
    ) {}
    async create(createGroupStudentDto: CreateGroupStudentDto) {     
      const group = await this.groupModel.findById(createGroupStudentDto.group_id);
      if (!group) throw new BadRequestException("Group not found");
      
      const student = await this.studentModel.findOne({ _id: createGroupStudentDto.student_id });
      if (!student) throw new BadRequestException("Student not found");
  
      return this.groupStudentModel.create(createGroupStudentDto);
  }
  

  findOne(id: string) {
    return this.groupStudentModel.find({group_id: id}).populate('student_id');
  }

  async update(id: string) {
    await this.groupStudentModel.findOneAndRemove({ student_id: id });
    return {message: "Succesfully removed"}
  }

}
