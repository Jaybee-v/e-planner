import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lesson_subscriptions')
export class LessonSubscription {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  riderId: string;

  @Column('varchar')
  lessonId: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
