import { CreateLessonDto } from 'src/infrastructures/dtos/create/create-lesson';
import { LessonM } from '../models/Lesson';

export interface LessonRepository {
  create(createLessonDto: CreateLessonDto): Promise<LessonM>;
  findByHostId(id: string): Promise<LessonM[]>;
}
