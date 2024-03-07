import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from '../guards/isAdmin.guard';
import { Student } from './models/student.model';
import { FindStudentDto } from './dto/find-student.dto';

@ApiTags("Student")
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({summary: "Create a new student"})
  @ApiResponse({status: 201, type: Student})
  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({summary: "filter students"})
  @Get()
  findAll(@Body() findStudentDto: FindStudentDto) {
    return this.studentService.findAll(findStudentDto)
  }

  @ApiOperation({summary: "get one student"})
  @ApiResponse({status: 200, type: Student})
  @UseGuards(IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @ApiOperation({summary: "update student"})
  @ApiResponse({status: 200, type: Student})
  @UseGuards(IsAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({summary: "delete student"})
  @ApiResponse({status: 200, type: "Successfully removed"})
  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
