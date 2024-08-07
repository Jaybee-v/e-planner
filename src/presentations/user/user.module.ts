import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { RiderModule } from './rider/rider.module';
import { StableModule } from './stable/stable.module';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [RepositoriesModule, RiderModule, StableModule, OrganizationModule],
  controllers: [UserController, OrganizationController],
})
export class UserModule {}
