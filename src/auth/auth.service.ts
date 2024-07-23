import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getTokenForUser(user) {
    const payload = {
      sub: user.username,
      iss: user.issuer,
    };
    return this.jwtService.sign(payload);
  }
}
