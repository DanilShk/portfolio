import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadUser } from '../types/payload-usr.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
  private readonly jwtAccessSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtAccessExpiresIn: string;
  private readonly jwtRefreshExpiresIn: string;
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.jwtAccessSecret =
      configService.getOrThrow<string>('JWT_ACCESS_SECRET');
    this.jwtRefreshSecret =
      configService.getOrThrow<string>('JWT_REFRESH_SECRET');
    this.jwtAccessExpiresIn = configService.getOrThrow<string>(
      'JWT_ACCESS_EXPIRES_IN',
    );
    this.jwtRefreshExpiresIn = configService.getOrThrow<string>(
      'JWT_REFRESH_EXPIRES_IN',
    );
  }

  async getTokens(
    payload: PayloadUser,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: payload.id,
          email: payload.email,
        },
        {
          secret: this.jwtAccessSecret,
          expiresIn: this.jwtAccessExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          id: payload.id,
          email: payload.email,
        },
        {
          secret: this.jwtRefreshSecret,
          expiresIn: this.jwtRefreshExpiresIn,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
