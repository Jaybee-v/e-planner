import { Module } from '@nestjs/common';
import { StableController } from './stable.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { InstructorModule } from './instructor/instructor.module';
import { LessonController } from './lesson/lesson.controller';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [RepositoriesModule, InstructorModule, LessonModule],
  controllers: [StableController, LessonController],
})
export class StableModule {}
