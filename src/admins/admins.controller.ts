import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './model/admin.model';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { SuperAdmin } from '../guards/isSuper-admin.guard';
import { IsAdmin } from '../guards/isAdmin.guard';
import { CreateAdminDto, ForgotPassword, LoginAdminDto, OtpAccess, UpdateAdminDto, UpdatePass } from './dto';


@ApiTags("Admins")
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({summary: "create admin", description: "Only superAdmin create admin"})
  @Post("signup")
  @UseGuards(SuperAdmin)
  create(@Body() createAdminDto: CreateAdminDto,@Res({passthrough: true}) res: Response) {
    return this.adminsService.registeration(createAdminDto,res);
  }


  @ApiOperation({summary: "activate admin"})
  @ApiResponse({status: 200, type: [Admin]})
  @Post('forgotpassword')
  forgotPassword(@Body() forgotPass: ForgotPassword) {
    return this.adminsService.forgotPassword(forgotPass)
  }


  @ApiOperation({summary: "refresh admin's tokens"})
  @UseGuards(IsAdmin)
  @Post(':id/refresh')
  refresh(@Param('id') id:string, @CookieGetter('refresh_token') refreshToken:string,@Res({passthrough: true}) res: Response){
    return this.adminsService.refreshToken(id,refreshToken,res);
  }

  @ApiOperation({summary: "Access otp"})
  @Post('otp')
  otpAccess(@Body() otpAccessDto: OtpAccess,@Res({passthrough: true}) res: Response){
    return this.adminsService.otpAccess(otpAccessDto,res);
  }

  @ApiOperation({summary: "update admin"})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(SuperAdmin)
  @Put("/update/:id")
  update(@Body() updateAdminDto: UpdateAdminDto,@Param('id') id:string){
    return this.adminsService.updateAdmin(id,updateAdminDto);
  }

  @ApiOperation({summary: "update admin's password"})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(IsAdmin)
  @Put("/password")
  updatePass(@Body() updatePass: UpdatePass, @CookieGetter('refresh_token') refreshToken:string){
    return this.adminsService.updatePass(refreshToken,updatePass);
  }
  
  @ApiOperation({summary: "login admin"})
  @ApiResponse({status: 200, type: Admin})
  @Post("/signin")
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({passthrough: true}) res: Response
    ) {
    return this.adminsService.login(loginAdminDto, res);
  }

  @ApiOperation({summary: "get all admins"})
  @ApiResponse({status: 200, type: [Admin]})
  @UseGuards(SuperAdmin)
  @Get("/all")
  getAdmins() {
    return this.adminsService.getAdmins();
  }

  @ApiOperation({summary: "get one admin"})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(SuperAdmin)
  @Get("/:id")
  getOneAdmin(@Param('id') id:string) {
    return this.adminsService.getOneAdmin(id);
  }

  @ApiOperation({summary: "logout admin"})
  @UseGuards(IsAdmin)
  @Post("/logout")
  logout(@CookieGetter('refresh_token') refresh_token: string, @Res({passthrough: true}) res: Response) {
    return this.adminsService.logout(refresh_token, res)
  }

  @ApiOperation({summary: "delete admin"})
  @UseGuards(SuperAdmin)
  @Delete("/delete/:id")
  deleteAdmin(@Param('id') id:string) {
    return this.adminsService.deleteAdmin(id)
  }
}
