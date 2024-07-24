import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepositoryOrm } from 'src/infrastructures/repositories/user.repository';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserRepositoryOrm,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    console.log('USER', user);

    if (!user) {
      throw new HttpException(
        {
          status: 404,
          error: 'User not found, check your credentials',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatching = await comparePassword(pass, user.password);
    console.log('IS MATCHING === ', isMatching);

    if (!isMatching) {
      throw new HttpException(
        {
          status: 400,
          error: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async isAuthenticated(req: any): Promise<any> {
    try {
      console.log(req);

      const token = this.extractTokenFromHeader(req);
      console.log('TOKEN', token);

      if (token === undefined) {
        throw new HttpException(
          {
            status: 401,
            error: 'You are not authenticated. Please login to continue',
          },
          401,
        );
      }
      console.log(token);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET as string,
      });

      return !!payload;
    } catch {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
