import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from '../admins/model/admin.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class IsAdmin implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(Admin.name) private readonly adminRepo: Model<AdminDocument>,
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException("Token is required");
        }
        const [bearer, token] = authHeader.split(" ");

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException("Token is required");
        }
        const user = await this.jwtService.verify(token, {
            secret: process.env.ACCESS_TOKEN_KEY,
        });
        if (!user) {
            throw new UnauthorizedException("Access token is required");
        }
        const admin = await this.adminRepo.findOne({ _id: user.id });
        
        if (!admin) {
            throw new UnauthorizedException("User not admin");
        }
        if (admin.role === "superAdmin" || admin.role === "admin") {
            return true;
        }

        throw new UnauthorizedException("Access denied");
    }
}
