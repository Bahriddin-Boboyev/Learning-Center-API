import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subject, SubjectDocument } from '../subject/models/subject.model';
import { Teacher, TeacherDocument } from '../teacher/models/teacher.model';
import { Model } from 'mongoose';
import { Group, GroupDocument } from './models/group.model';
import { FindGroupDto } from './dto/find-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @InjectModel(Teacher.name) private readonly teacherModel: Model<TeacherDocument>,
    @InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>,
    ) {}
  create(createGroupDto: CreateGroupDto) {
    const teacher = this.teacherModel.findOne({_id: createGroupDto.teacher_id})
    if (!teacher) throw new BadRequestException("Teacher not found") 
    const subject = this.subjectModel.findOne({_id: createGroupDto.subject_id})
    if (!subject) throw new BadRequestException("Subject not found") 

    return this.groupModel.create(createGroupDto)
  }

  async findAll(findGroupDto: FindGroupDto) {
    const where = {};

    if (!findGroupDto.title && !findGroupDto.start_time && !findGroupDto.end_time) {
      const groups = await this.groupModel.find().populate('teacher_id subject_id');
      return groups;
    }

    if (findGroupDto.title) {
      where['title'] = {
        $regex: new RegExp(findGroupDto.title, 'i')
      };
    }

    if (findGroupDto.start_time && findGroupDto.end_time) {
      where['start_time'] = {
        $gte: findGroupDto.start_time,
        $lte: findGroupDto.end_time,
      };
    } else if (findGroupDto.start_time) {
      where['start_time'] = { $gte: findGroupDto.start_time };
    } else if (findGroupDto.end_time) {
      where['start_time'] = { $lte: findGroupDto.end_time };
    }

    const groups = await this.groupModel.find(where).populate('teacher_id subject_id');
    return groups;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupModel.findByIdAndUpdate(id, updateGroupDto, {new: true}).populate('subject_id','teacher_id');
    return group
  }

  async remove(id: string) {
    await this.groupModel.findByIdAndRemove(id);
    return {message: "Successfully removed"}
  }
}
