import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.UsersService.findOneByUsername(username);
    if (
      user &&
      (await this.UsersService.validatePassword(password, user.password))
    ) {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }

  async validateUser(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
