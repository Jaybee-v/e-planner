import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [InstructorController],
})
export class InstructorModule {}
