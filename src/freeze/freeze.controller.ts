import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { FreezeService } from './freeze.service';
import { CreateFreezeDto } from './dto/create-freeze.dto';
import { UpdateFreezeDto } from './dto/update-freeze.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from '../guards/isAdmin.guard';
import { Freeze } from './models/freeze.model';

@ApiTags("Freeze time")
@Controller('freeze')
export class FreezeController {
  constructor(private readonly freezeService: FreezeService) {}

  @ApiOperation({summary: "create freeze time"})
  @ApiResponse({status: 201, type: Freeze})
  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createFreezeDto: CreateFreezeDto) {
    return this.freezeService.create(createFreezeDto);
  }

  @ApiOperation({summary: "get all freeze times"})
  @ApiResponse({status: 200, type: [Freeze]})
  @UseGuards(IsAdmin)
  @Get()
  findAll() {
    return this.freezeService.findAll();
  }
  
  @ApiOperation({summary: "get one freeze time"})
  @ApiResponse({status: 200, type: Freeze})
  @UseGuards(IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freezeService.findOne(id);
  }
  
  @ApiOperation({summary: "update freeze time"})
  @ApiResponse({status: 200, type: Freeze})
  @UseGuards(IsAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFreezeDto: UpdateFreezeDto) {
    return this.freezeService.update(id, updateFreezeDto);
  }
  
  @ApiOperation({summary: "delete freeze time"})
  @ApiResponse({status: 200, type: Freeze})
  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freezeService.remove(id);
  }
}
