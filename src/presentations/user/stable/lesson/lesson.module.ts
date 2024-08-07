import { forwardRef, Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { LessonController } from './lesson.controller';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [RepositoriesModule, forwardRef(() => SubscriptionModule)],
  controllers: [LessonController],
})
export class LessonModule {}
