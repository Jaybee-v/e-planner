import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  riderId: string;

  @IsString()
  @IsNotEmpty()
  lessonId: string;
}
