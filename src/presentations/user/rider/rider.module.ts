import { Module } from '@nestjs/common';
import { RiderController } from './rider.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [RepositoriesModule, OrganizationModule],
  controllers: [RiderController],
})
export class RiderModule {}
