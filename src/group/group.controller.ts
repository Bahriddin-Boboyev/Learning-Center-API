import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { IsAdmin } from '../guards/isAdmin.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Group } from './models/group.model';
import { FindGroupDto } from './dto/find-group.dto';

@ApiTags("Groups")
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({summary: "Create group"})
  @ApiResponse({status: 201, type: Group})
  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({summary: "Get one Group"})
  @ApiResponse({status: 200, type: [Group]})
  @UseGuards(IsAdmin)
  @Get()
  findAll(findGroupDto: FindGroupDto) {
    return this.groupService.findAll(findGroupDto);
  }

  @ApiOperation({summary: "Update Group"})
  @ApiResponse({status: 200, type: Group})
  @UseGuards(IsAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiOperation({summary: "delete Group"})
  @ApiResponse({status: 200, type: "Successfully removed"})
  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
