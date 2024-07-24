import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateStableDto } from 'src/infrastructures/dtos/create/create-stable.dto';
import { StableStoreRepositoryOrm } from 'src/infrastructures/repositories/stable-store.repository';
import { StableRepositoryOrm } from 'src/infrastructures/repositories/stable.repository';
import { AuthGuard } from '../auth/auth.guard';

@Controller('stable')
export class StableController {
  constructor(
    private readonly stableService: StableRepositoryOrm,
    private readonly stableStoreService: StableStoreRepositoryOrm,
  ) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(@Body() createStableDto: CreateStableDto, @Request() req: any) {
    try {
      console.log(req.user);

      if (req.user.role !== 'stable') {
        return {
          status: 'error',
          code: 401,
          message: 'You are not authorized to access this resource',
        };
      }
      const stable = await this.stableService.create(createStableDto);
      return {
        status: 'success',
        code: 201,
        message: 'Stable created successfully',
        data: stable,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: 'Internal server error',
      };
    }
  }

  @Get('store/:zipcode')
  async getStableStore(@Param('zipcode') zipcode: string) {
    try {
      const stores = await this.stableStoreService.findByZipcode(zipcode);
      return {
        status: 'success',
        code: 200,
        message: 'Stable stores retrieved successfully',
        data: stores,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: 'Internal server error',
      };
    }
  }

  @Get(':id')
  async getStable(@Param('id') id: string) {
    try {
      const stable = await this.stableService.findById(id);
      return {
        status: 'success',
        code: 200,
        message: 'Stable retrieved successfully',
        data: stable,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: 'Internal server error',
      };
    }
  }
}
