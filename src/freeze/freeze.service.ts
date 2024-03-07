import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateFreezeDto } from './dto/create-freeze.dto';
import { UpdateFreezeDto } from './dto/update-freeze.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Freeze, FreezeDocument } from './models/freeze.model';
import { Model } from 'mongoose';
import { GroupStudent, GroupStudentDocument } from '../group_student/models/group_student.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FreezeService {
  constructor(
    @InjectModel(Freeze.name) private readonly freezeModel: Model<FreezeDocument>,
    @InjectModel(GroupStudent.name) private readonly groupStudentModel: Model<GroupStudentDocument>,
  ) {}

  async create(createFreezeDto: CreateFreezeDto) {
    const group = await this.groupStudentModel.findOne({
      group_id: createFreezeDto.group_id,
      student_id: createFreezeDto.student_id,
    });

    if (!group) {
      throw new BadRequestException("Group or student not found");
    }

    return this.freezeModel.create(createFreezeDto);
  }

  findAll() {
    return this.freezeModel.find().populate('student_id').populate('group_id');
  }

  async findOne(id: string) {
    const freeze = await this.freezeModel.findById(id).populate('student_id').populate('group_id');
    if (!freeze) {
      throw new BadRequestException("Freeze not found");
    }
    return freeze;
  }

  async update(id: string, updateFreezeDto: UpdateFreezeDto) {
    const freeze = await this.freezeModel.findByIdAndUpdate(id, updateFreezeDto, { new: true }).populate('student_id').populate('group_id');
    if (!freeze) {
      throw new BadRequestException("Freeze not found");
    }
    return freeze;
  }

  async remove(id: string) {
    const freeze = await this.freezeModel.findByIdAndRemove(id);
    if (!freeze) {
      throw new BadRequestException("Freeze not found");
    }
    return { message: "Successfully removed" };
  }
}
