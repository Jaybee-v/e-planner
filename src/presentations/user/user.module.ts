import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { RiderModule } from './rider/rider.module';
import { StableModule } from './stable/stable.module';

@Module({
  imports: [RepositoriesModule, RiderModule, StableModule],
  controllers: [UserController],
})
export class UserModule {}
