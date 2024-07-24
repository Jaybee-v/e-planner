import { InjectRepository } from '@nestjs/typeorm';
import { InstructorRepository } from 'src/domains/repositories/instructor.repository';
import { Instructor } from '../entities/instructor.entity';
import { Repository } from 'typeorm';
import { CreateInstructorDto } from '../dtos/create/create-instructor';
import { UserRepositoryOrm } from './user.repository';
import { InstructorM } from 'src/domains/models/Instructor';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateInstructorDto } from '../dtos/update/update-instructor';

interface NewInstructor {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  birthdate: string;
  email: string;
  stableId: string;
}

export class InstructorRepositoryOrm implements InstructorRepository {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    private readonly userService: UserRepositoryOrm,
  ) {}

  async create(createInstructorDto: CreateInstructorDto): Promise<any> {
    try {
      const password =
        createInstructorDto.email.split('@')[0] +
        'e-p-' +
        Math.floor(Math.random() * 1000).toString();
      const userEntity = await this.userService.create({
        email: createInstructorDto.email,
        password,
        role: 'instructor',
      });
      if (userEntity) {
        const userID = userEntity.id;
        const stableId = createInstructorDto.id;
        const newInstructor: NewInstructor = {
          ...createInstructorDto,
          stableId: stableId,
          id: userID,
        };
        const instructorEntity = await this.toInstructorEntity(newInstructor);
        const createdInstructor =
          await this.instructorRepository.save(instructorEntity);
        return this.toInstructorModel(createdInstructor);
      }
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          code: error.code,
          message: error.error,
        },
        error.code,
      );
    }
  }

  async findByStableId(id: string): Promise<InstructorM[]> {
    const instructors = await this.instructorRepository.find({
      where: { stableId: id },
    });

    return instructors.map((instructor) => this.toInstructorModel(instructor));
  }

  async findById(id: string): Promise<InstructorM> {
    const instructor = await this.instructorRepository.findOne({
      where: { id },
    });

    if (!instructor) {
      throw new HttpException(
        {
          status: 404,
          error: 'Instructor not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.toInstructorModel(instructor);
  }

  async update(
    id: string,
    updateInstructorDto: UpdateInstructorDto,
    sub: string,
  ): Promise<InstructorM> {
    const instructor = await this.instructorRepository.findOne({
      where: { id: id },
    });

    if (!instructor) {
      throw new HttpException(
        {
          status: 404,
          error: 'Instructor not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (sub !== instructor.stableId) {
      throw new HttpException(
        {
          status: 401,
          error: 'You are not authorized to access this resource',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    instructor.name = updateInstructorDto.name;
    instructor.lastname = updateInstructorDto.lastname;
    instructor.phone = updateInstructorDto.phone;
    instructor.birthdate = new Date(updateInstructorDto.birthdate);

    await this.instructorRepository.save(instructor);

    return this.toInstructorModel(instructor);
  }

  private toInstructorEntity(createInstructorDto: NewInstructor): Instructor {
    const instructorEntity = new Instructor();

    instructorEntity.id = createInstructorDto.id;
    instructorEntity.name = createInstructorDto.name;
    instructorEntity.lastname = createInstructorDto.lastname;
    instructorEntity.phone = createInstructorDto.phone;
    instructorEntity.birthdate = new Date(createInstructorDto.birthdate);
    instructorEntity.stableId = createInstructorDto.stableId;

    return instructorEntity;
  }

  private toInstructorModel(instructorEntity: Instructor): InstructorM {
    const model = new InstructorM();

    model.id = instructorEntity.id;
    model.name = instructorEntity.name;
    model.lastname = instructorEntity.lastname;
    model.phone = instructorEntity.phone;
    model.stableId = instructorEntity.stableId;
    model.birthdate = instructorEntity.birthdate;
    model.createdAt = instructorEntity.createdAt;
    model.updatedAt = instructorEntity.updatedAt;

    return model;
  }
}
