import { CreateInstructorDto } from 'src/infrastructures/dtos/create/create-instructor';
import { InstructorM } from '../models/Instructor';

export interface InstructorRepository {
  create(createInstructorDto: CreateInstructorDto): Promise<InstructorM>;
  findByStableId(id: string): Promise<InstructorM[]>;
  findById(id: string): Promise<InstructorM>;
  update(
    id: string,
    createInstructorDto: CreateInstructorDto,
    sub: string,
  ): Promise<InstructorM>;
}
