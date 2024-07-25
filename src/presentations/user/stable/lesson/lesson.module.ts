import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { LessonController } from './lesson.controller';

@Module({
  imports: [RepositoriesModule],
  controllers: [LessonController],
})
export class LessonModule {}
