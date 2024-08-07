import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Index('lesson_stable_idx')
  @Column('varchar')
  hostId: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  description: string;

  @Column()
  date: Date;

  @Column('varchar')
  instructorId: string;

  @Column('int')
  maxParticipants: number;

  @Index()
  @Column('varchar')
  startTime: string;

  @Column('varchar')
  endTime: string;

  @Column('int')
  levelRequired: number;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
