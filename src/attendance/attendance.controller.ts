import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from '../guards/isAdmin.guard';
import { Attendance } from './models/attendance.model';

@ApiTags("Attendance")
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiOperation({summary: "Create Attendance"})
  @ApiResponse({status: 201, type: Attendance})
  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto, @CookieGetter('refresh_token') refreshToken:string) {
    return this.attendanceService.create(createAttendanceDto, refreshToken);
  }

  @ApiOperation({summary: "Get all Attendance"})
  @ApiResponse({status: 200, type: [Attendance]})
  @UseGuards(IsAdmin)
  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @ApiOperation({summary: "Get one Attendance"})
  @ApiResponse({status: 200, type: Attendance})
  @UseGuards(IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @ApiOperation({summary: "Update Attendance"})
  @ApiResponse({status: 200, type: Attendance})
  @UseGuards(IsAdmin)
  @Put('update')
  update(@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(updateAttendanceDto);
  }

}
