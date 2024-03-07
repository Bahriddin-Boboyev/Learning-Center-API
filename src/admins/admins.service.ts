import { BadRequestException, Injectable, UnauthorizedException, ForbiddenException, UploadedFile } from '@nestjs/common';
import *as bcrypt from 'bcrypt';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
const otpGenerator = require('otp-generator')
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from './model/admin.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from '../redis/redis.service';
import { SmsService } from '../sms/sms.service';
import { CreateAdminDto, ForgotPassword, LoginAdminDto, OtpAccess, UpdateAdminDto, UpdatePass } from './dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private readonly tokenService: TokensService, 
    private readonly redisService: RedisService,
    private readonly smsService: SmsService,
    private readonly jwtService: JwtService,
  ) {}

  /**Register admin */
  async registeration(createAdminDto: CreateAdminDto, res: Response){
    const admin = await this.adminModel.findOne({email: createAdminDto.email, is_active: true})
    if (admin) {
      throw new BadRequestException("admin already exists")
    }

    if (createAdminDto.password !== createAdminDto.access_password) {
      throw new BadRequestException("Passwords is not valid")
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      password: hashed_password
    });
    const tokens = await this.tokenService.getToken(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.findOneAndUpdate(
      { _id: newAdmin._id },
      { refresh_token: hashed_refresh_token },
      { new: true }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 10 * 60 * 24 * 60 * 1000,
      httpOnly: true
    })


    const payload = {
      id:updatedAdmin.id,
      name:updatedAdmin.name,
      phone: updatedAdmin.phone,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
    }
    const response = {
      admin: payload,
      tokens,
    }
    return response
  }

  //** Forgot password phone: string */
  async forgotPassword(forgotPass:ForgotPassword) {
    const {phone} = forgotPass
    const admin = await this.adminModel.findOne({phone, is_active: true})
    if(!admin){
      throw new BadRequestException('Email is incorrect')
    }
    const otp = otpGenerator.generate(4, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });

    try {
      await this.redisService.set("otp", otp)
    } catch (error) {
     throw new  Error("Service error")
    }
    try {
      await this.smsService.sendSms(phone.slice(1),otp)
    } catch (error) {
     throw new  Error("SMS error")
    }

    return {message: "Otp successfully send"}
  }

  //**For refresh token  */
  async refreshToken(adminId: string, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('Admin not found');
    }

    const admin = await this.adminModel.findOne({ _id: adminId });

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, admin.refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.tokenService.getToken(admin);
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 12);

    const updatedAdmin = await this.adminModel.findOneAndUpdate(
      { _id: admin._id },
      { refresh_token: hashedRefreshToken },
      { new: true }
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const payload = {
      id: updatedAdmin.id,
      name: updatedAdmin.name,
      phone: updatedAdmin.phone,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
    };

    const response = {
      message: 'OK',
      admin: payload,
      tokens,
    };

    return response;
  }

  //**Acces fot otp otp:string , phone: string */
  async otpAccess(otpAccess: OtpAccess, res: Response) {
    const { otp, phone } = otpAccess;

    const storedOtp = await this.redisService.get('otp');

    if (!storedOtp) {
      throw new BadRequestException('OTP expired');
    }

    if (storedOtp !== otp) {
      throw new ForbiddenException('Incorrect OTP');
    }

    const admin = await this.adminModel.findOne({ phone, is_active: true });
    const tokens = await this.tokenService.getToken(admin);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 60 * 24 * 60 * 1000,
      httpOnly: true,
    });

    const payload = {
      id: admin.id,
      name: admin.name,
      phone: admin.phone,
      email: admin.email,
      role: admin.role,
    };

    const response = {
      admin: payload,
      tokens,
    };

    return response;
  }


//**Update admin name, email, role, phone */
  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findOne({ _id: adminId, is_active:true });

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      admin._id,
      updateAdminDto ,
      { new: true },
    );

    if (!updatedAdmin) {
      throw new BadRequestException('Update failed');
    }

    const payload = {
      id: updatedAdmin._id,
      name: updatedAdmin.name,
      phone: updatedAdmin.phone,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
    };

    return { message: 'Success', admin: payload };
  }
  
//**login admin email, password */
  async login (loginAdminDto: LoginAdminDto, res: Response) {
    const {email, password} = loginAdminDto;
    const admin = await this.adminModel.findOne({email:email, is_active: true})
    if(!admin) {
      throw new UnauthorizedException('email or password incorrect1')
    }
    const isMatchPass = await bcrypt.compare(password,admin.password)
    if(!isMatchPass) {
      throw new UnauthorizedException('email or password incorrect')
    }

    const tokens = await this.tokenService.getToken(admin)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,12);
    const updatedAdmin = await this.adminModel.findOneAndUpdate(
      { _id: admin._id },
      { refresh_token: hashed_refresh_token },
      { new: true }
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true,
    })

      const payload = {
        id:updatedAdmin.id,
        name:updatedAdmin.name,
        phone: updatedAdmin.phone,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
      }
    
    
    const response = {
      message: "admin loggid in",
      admin: payload,
      tokens
    }
    return response
  }

//**get all admins */
  async getAdmins () {
    return await this.adminModel.find()
  }

//**get one admin by id */
  async getOneAdmin(id: string) {
    const admin = await this.adminModel.findOne({_id: id})
    const payload = {
      id:admin._id,
      name:admin.name,
      phone: admin.phone,
      email: admin.email,
      role: admin.role,
    }

    return payload
  } 

//**log out only */
  async logout(refreshToken: string, res: Response) {
    try {
      const userData = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!userData) {
        throw new ForbiddenException('User not found');
      }

      await this.adminModel.updateOne(
        { _id: userData.id },
        { refresh_token: null }
      );

      res.clearCookie('refresh_token');
      return { message: 'Logged out' };
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
  
//**delete admin only super admin */
  async deleteAdmin(adminId: string) {

    const admin = await this.adminModel.findOne({
      _id: adminId,
      is_active: true,
    });

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    await this.adminModel.updateOne(
      { _id: adminId },
      { is_active: false, refresh_token: null }
    );

    return { message: 'Admin deleted' };
  }

  //**update password only superadmin */
  async updatePass(refreshToken: string, updatePass: UpdatePass) {
    const decodedToken = this.jwtService.decode(refreshToken);
    const admin = await this.adminModel.findOne({ _id: decodedToken['id'] });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    if (updatePass.old_password && updatePass.new_password) {
      const oldPassMatch = await bcrypt.compare(
        updatePass.old_password,
        admin.password,
      );

      if (!oldPassMatch) {
        throw new BadRequestException('Incorrect password');
      }
    }

    const hashed_password = await bcrypt.hash(
      updatePass.new_password,
      12,
    );

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      admin._id,
      { password: hashed_password },
      { new: true },
    );

    if (!updatedAdmin) {
      throw new BadRequestException('Update failed');
    }

    return {message: "Successfully updated"}
  }
}