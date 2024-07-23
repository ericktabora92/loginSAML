import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SamlStrategy } from './strategies/saml.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SamlAuthGuard } from './guard/saml-auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    SamlAuthGuard,
    SamlStrategy,
  ],
  exports: [AuthService, SamlStrategy],
})
export class AuthModule {}
