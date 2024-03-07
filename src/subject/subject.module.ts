import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './models/subject.model';
import { JwtModule } from '@nestjs/jwt';
import { Admin, AdminSchema } from '../admins/model/admin.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Subject.name, schema: SubjectSchema}, {name: Admin.name, schema: AdminSchema}]), JwtModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
