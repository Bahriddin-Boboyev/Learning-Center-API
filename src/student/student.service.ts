import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './models/student.model';
import { Model } from 'mongoose';
import { FindStudentDto } from './dto/find-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>) {}

  create(createStudentDto: CreateStudentDto) {
    return this.studentModel.create(createStudentDto)
  }

  async findAll(findStudentDto: FindStudentDto) {
    const where = {};
  
    if (!findStudentDto.full_name && !findStudentDto.phone_number) {
      const students = await this.studentModel.find();
      return students;
    }
  
    if (findStudentDto.full_name) {
      where['full_name'] = {
        $regex: new RegExp(findStudentDto.full_name, 'i')
      };
    }
    if (findStudentDto.phone_number) {
      where['phone_number'] = {
        $regex: new RegExp(findStudentDto.phone_number, 'i')
      };
    }
  
    const students = await this.studentModel.find(where);
  
    if (students.length == 0) {
      throw new BadRequestException("not found");
    }
  
    return students;
  }
  

  findOne(id: string) {
    return this.studentModel.findById(id);
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto, {new: true});
  }
  
  async remove(id: string) {
    await this.studentModel.findByIdAndRemove(id);
    return {message: "Successfully removed"}
  }
}