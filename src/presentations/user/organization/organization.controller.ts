import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrganizationDto } from 'src/infrastructures/dtos/create/create-organization.dto';
import { OrganizationRepositoryOrm } from 'src/infrastructures/repositories/organization.repository';
import { AuthGuard } from '../auth/auth.guard';

@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationRepositoryOrm,
  ) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Req() req: any,
  ) {
    try {
      const result = await this.organizationService.create(
        createOrganizationDto,
        req,
      );
      return {
        status: 'success',
        message: 'Votre inscription a bien été enregsitrée.',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: error.response ? error.response.error : error.message,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('by-rider/:riderId')
  async findByRiderId(@Param('riderId') riderId: string) {
    try {
      const result = await this.organizationService.findByRiderId(riderId);
      return {
        status: 'success',
        message: 'Organizations found',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: error.response ? error.response.error : error.message,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('by-stable/:stableId')
  async findByStableId(@Param('stableId') stableId: string) {
    try {
      const result = await this.organizationService.findByStableId(stableId);
      return {
        status: 'success',
        message: 'Organizations found',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: error.response ? error.response.error : error.message,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Patch('action-on-rider')
  async stableActionOnRider(
    @Body() body: { stableId: string; riderId: string; value: number },
  ) {
    try {
      await this.organizationService.stableActionOnRider(
        body.value,
        body.stableId,
        body.riderId,
      );
      return {
        status: 'success',
        code: 200,
        message: "Vous venez d'accepter le cavalier.",
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: error.response ? error.response.error : error.message,
      };
    }
  }
}
