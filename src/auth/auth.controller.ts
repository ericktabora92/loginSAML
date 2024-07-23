import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/model/user';
import { SamlAuthGuard } from './guard/saml-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Get('login')
  @UseGuards(AuthGuard('saml'))
  login() {}

  @Post('callback')
  @UseGuards(SamlAuthGuard)
  callback(@Req() req: any, @Res() res: Response) {
    if (req.user) {
      const user = req.user as User;
      const jwt = this.authService.getTokenForUser(user);
      this.userService.storeUser(user);
      this, res.redirect('/?jwt=' + jwt);
    }
  }
}
