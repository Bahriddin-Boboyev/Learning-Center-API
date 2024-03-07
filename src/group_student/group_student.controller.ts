import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupStudentService } from './group_student.service';
import { CreateGroupStudentDto } from './dto/create-group_student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from '../guards/isAdmin.guard';
import { GroupStudent } from './models/group_student.model';

@Controller()
export class GroupStudentController {
  constructor(private readonly groupStudentService: GroupStudentService) {}

  @ApiTags("Groups")
  @ApiOperation({summary: "Get one Group"})
  @ApiResponse({status: 200, type: GroupStudent})
  @UseGuards(IsAdmin)
  @Get('group/:id')
  findOne(@Param('id') id: string) {
    return this.groupStudentService.findOne(id);
  }
  
  @ApiTags("Manage groups")
  @ApiOperation({summary: "Add student to Group"})
  @ApiResponse({status: 200, type: GroupStudent})
  @UseGuards(IsAdmin)
  @Post('group/student')
  create(@Body() createGroupStudentDto: CreateGroupStudentDto) {
    return this.groupStudentService.create(createGroupStudentDto);
  }

  @ApiTags("Manage groups")
  @ApiOperation({summary: "Delete or update a student  group"})
  @ApiResponse({status: 200, type: GroupStudent})
  @UseGuards(IsAdmin)
  @Put('group/student/:id')
  update(@Param('id') id: string) {
    return this.groupStudentService.update(id);
  }

}
