import { Module } from '@nestjs/common';
import { StableController } from './stable.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [RepositoriesModule, InstructorModule],
  controllers: [StableController],
})
export class StableModule {}
