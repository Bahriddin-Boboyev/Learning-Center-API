import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subject, SubjectDocument } from './models/subject.model';
import { Model } from 'mongoose';

@Injectable()
export class SubjectService {
  constructor(@InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>) {}

  create(createSubjectDto: CreateSubjectDto) {
    return this.subjectModel.create(createSubjectDto)
  }

  findAll() {
    return this.subjectModel.find()
  }

  findOne(id: string) {
    return this.subjectModel.findById(id)
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const upd = await this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, {new: true}); 
    return upd
  }

  async remove(id: string) {
    await this.subjectModel.findByIdAndRemove(id);
    return {message: "Successfully deleted"}
  }
}
