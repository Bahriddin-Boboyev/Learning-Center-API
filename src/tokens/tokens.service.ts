import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {

    constructor(private readonly jwtService: JwtService) {}
    async getToken(user: any){
        const jwtPayload = {
          id: user.id,
          email: user.email,
          is_active: user.is_active,
          role: user.role
        };
    
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: process.env.ACCESS_TOKEN_TIME
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: process.env.REFRESH_TOKEN_TIME
          }),
        ])
        return {
          access_token: accessToken,
        refresh_token: refreshToken
      }
      }
}
