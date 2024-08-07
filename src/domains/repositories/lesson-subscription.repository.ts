import { CreateLessonSubscriptionDto } from 'src/infrastructures/dtos/create/create-lesson-subscritpion.dto';
import { LessonSubscriptionM } from '../models/LessonSubscription';
import { RiderM } from '../models/Rider';

export interface LessonSubscriptionRepository {
  create(
    createLessonSubscriptionDto: CreateLessonSubscriptionDto,
    req: any,
  ): Promise<LessonSubscriptionM>;
  findSubscriptionByLessonId(lessonId: string): Promise<LessonSubscriptionM[]>;
  findSubAndRiderByLessonId(lessonId: string): Promise<RiderM[]>;
}
