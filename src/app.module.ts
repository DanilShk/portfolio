import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { configEnv } from './common/configs/env-config';
import { pinoConfig } from './common/configs/pino-config';
import { staticConfig } from './common/configs/static-config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DbModule } from './infrastructure/db/db.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UserModule } from './user/user.module';
import { jwtConfig } from './common/configs/jwt-config';

@Module({
  imports: [
    ConfigModule.forRoot(configEnv),
    LoggerModule.forRoot(pinoConfig),
    DbModule,
    AuthModule,
    UserModule,
    JwtModule.register(jwtConfig),
    PortfolioModule,
    ServeStaticModule.forRoot(staticConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
