import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Subject } from './models/subject.model';
import { IsAdmin } from '../guards/isAdmin.guard';

@ApiTags("Subjects")
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({summary: "Create new Subject"})
  @ApiResponse({status: 201, type: Subject})
  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }
  
  @ApiOperation({summary: "Get all subjects"})
  @ApiResponse({status: 200, type: [Subject]})
  @UseGuards(IsAdmin)
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }
  
  @ApiOperation({summary: "Get one subject"})
  @ApiResponse({status: 200, type: Subject})
  @UseGuards(IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }
  
  @ApiOperation({summary: "Update subject"})
  @ApiResponse({status: 200, type: Subject})
  @UseGuards(IsAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(id, updateSubjectDto);
  }
  
  @ApiOperation({summary: "Delete Subject"})
  @ApiResponse({status: 200, type: "Successfully deleted"})
  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
