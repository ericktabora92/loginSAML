import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-saml';
import { Injectable } from '@nestjs/common';
import { User } from '../../model/user';
import { SAML_PROFILE } from '../../common/constants';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor() {
    super({
      entryPoint: process.env.ENTRY_POINT,
      issuer: process.env.ISSUER,
      callbackUrl: process.env.CALLBACK_URL,
      cert: process.env.CERT,
      identifierFormat: true,
    });
  }

  async validate(profile: Profile): Promise<any> {
    const user: User = {
      username: profile.attributes[SAML_PROFILE.username] as string,
      email: profile[SAML_PROFILE.email] as string,
      issuer: profile.issuer as string,
      phone: profile.issuer as string,
    };
    return user;
  }
}
