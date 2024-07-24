import { Controller, Get, Param } from '@nestjs/common';
import { StableStoreRepositoryOrm } from 'src/infrastructures/repositories/stable-store.repository';
import { StableRepositoryOrm } from 'src/infrastructures/repositories/stable.repository';

@Controller('stable')
export class StableController {
  constructor(
    private readonly stableService: StableRepositoryOrm,
    private readonly stableStoreService: StableStoreRepositoryOrm,
  ) {}

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
