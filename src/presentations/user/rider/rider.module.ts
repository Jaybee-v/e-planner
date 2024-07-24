import { Module } from '@nestjs/common';
import { RiderController } from './rider.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [RiderController],
})
export class RiderModule {}
