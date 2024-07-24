import { Module } from '@nestjs/common';
import { StableController } from './stable.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [StableController],
})
export class StableModule {}
