import { forwardRef, Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { OrganizationController } from './organization.controller';
import { RiderModule } from '../rider/rider.module';

@Module({
  imports: [RepositoriesModule, forwardRef(() => RiderModule)],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
