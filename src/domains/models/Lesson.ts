import { InstructorM } from './Instructor';
import { RiderM } from './Rider';

export class LessonM {
  id: string;
  hostId: string;
  title: string;
  type: string;
  description: string;
  date: Date;
  instructorId: string;
  maxParticipants: number;
  startTime: string;
  endTime: string;
  levelRequired: number;
  createdAt: Date;
  updatedAt: Date;
}

export class LessonTableM {
  id: string;
  hostId: string;
  title: string;
  type: string;
  description: string;
  date: Date;
  instructorId: string;
  maxParticipants: number;
  startTime: string;
  endTime: string;
  levelRequired: number;
  createdAt: Date;
  updatedAt: Date;
  instructor: InstructorM;
  participantsIdentity: RiderM[];
}
