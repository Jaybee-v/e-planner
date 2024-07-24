import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NewsletterRepositoryOrm } from 'src/infrastructures/repositories/newsletter.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly newsletterService: NewsletterRepositoryOrm,
  ) {}

  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    console.log('RECORD === ', signInDto);
    try {
      const result = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      console.log(result);

      return {
        status: 'success',
        code: 200,
        message: 'User logged in successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.response.status,
        message: error.response.error,
        ok: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('check-is-authenticated')
  async checkIsAuthenticated(@Request() req: any) {
    try {
      return {
        status: 'success',
        code: 200,
        message: 'User is authenticated',
        data: '',
      };
    } catch (error) {
      console.log(error);
      // return
    }
  }

  @Post('newsletter/subscribe')
  async subscribeNewsletter(@Body() data: { email: string }) {
    try {
      console.log(data.email);

      const result = await this.newsletterService.create(data.email);
      return {
        status: 'success',
        code: 200,
        message: 'User subscribed to newsletter successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.response.status,
        message: error.response.error,
        ok: false,
      };
    }
  }
}
