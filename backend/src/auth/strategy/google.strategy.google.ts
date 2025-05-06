import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy , VerifyCallback } from 'passport-google-oauth20';
import { Roles } from 'src/common/role_User.common';
import googleOauthConfig from 'src/config/google.oauth.config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
   constructor(
    @Inject(googleOauthConfig.KEY) private googleConfiguration:ConfigType<typeof googleOauthConfig>,
    private userService:UserService
   ){

    super({
        clientID:googleConfiguration.clientID,
        clientSecret:googleConfiguration.clientSecret,
        callback:googleConfiguration.callbackURL,
        scope:['email','profile']
    })
   }
   async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const user = await this.userService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.name.givenName,
      password: 'defaultPassword',
      roles: [Roles.USER],
      provider: 'google'
    });
    done(null, user);
  }
  
}