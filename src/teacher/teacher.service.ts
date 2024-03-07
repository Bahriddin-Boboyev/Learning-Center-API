import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './models/teacher.model';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../subject/models/subject.model';
import { FindTeacherDto } from './dto/find-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private readonly teacherModel: Model<TeacherDocument>,
    @InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>,
    ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const subject = await this.subjectModel.findOne({_id: createTeacherDto.subject_id});
    if(!subject) throw new BadRequestException("Subject not found");
    return this.teacherModel.create(createTeacherDto)
  }

  async findAll(findTeacherDto: FindTeacherDto) {
    const where = {};

    if (!findTeacherDto.full_name && !findTeacherDto.phone) {
      const teachers = await this.teacherModel.find();
      return teachers;
    }
    if (findTeacherDto.full_name) {
      where['full_name'] = {
        $regex: new RegExp(findTeacherDto.full_name, 'i')
      };
    }
    if (findTeacherDto.phone) {
      where['phone'] = {
        $regex: new RegExp(findTeacherDto.phone, 'i')
      };
    }

    const teachers = await this.teacherModel.find(where);
    if (teachers.length == 0) {
      throw new BadRequestException("not found");
    }
    return teachers;
  }

  findOne(id: string) {
    return this.teacherModel.findById(id).populate('subject_id')
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, {new: true}).populate('subject_id')
  }

  remove(id: string) {
    return this.teacherModel.findByIdAndRemove(id)
  }
}
