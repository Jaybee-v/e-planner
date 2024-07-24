import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateRiderDto } from 'src/infrastructures/dtos/create/create-rider.dto';
import { RiderRepositoryOrm } from 'src/infrastructures/repositories/rider.repository';
import { AuthGuard } from '../auth/auth.guard';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderRepositoryOrm) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(@Body() createRiderDto: CreateRiderDto, @Request() req: any) {
    try {
      if (req.user.sub !== createRiderDto.id) {
        return {
          status: 'error',
          code: 401,
          message: 'You are not authorized to access this resource',
        };
      }
      const result = await this.riderService.create(createRiderDto);
      return {
        status: 'success',
        code: 201,
        message: 'Rider created successfully',
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
  @Get('himself/:id')
  async findById(@Param('id') id: string, @Request() req: any) {
    try {
      console.log(req.user);

      const result = await this.riderService.findById(id, req);
      return {
        status: 'success',
        code: 200,
        message: 'Rider retrieved successfully',
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
