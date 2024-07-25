import { InjectRepository } from '@nestjs/typeorm';
import { LessonRepository } from 'src/domains/repositories/lesson.repository';
import { Lesson } from '../entities/lesson.entity';
import { Between, Repository } from 'typeorm';
import { CreateLessonDto } from '../dtos/create/create-lesson';
import { LessonM } from 'src/domains/models/Lesson';
import { HttpException } from '@nestjs/common';
import { endOfWeek, startOfWeek } from 'date-fns';

export class LessonRepositoryOrm implements LessonRepository {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create(createLessontDto: CreateLessonDto): Promise<LessonM> {
    try {
      const lessonEntity = this.toLessonEntity(createLessontDto);
      const createdLesson = await this.lessonRepository.save(lessonEntity);
      return this.toLessonModel(createdLesson);
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

  async findByHostId(id: string): Promise<LessonM[]> {
    const today = new Date();
    const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Lundi
    const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 }); // Dimanche

    const lessons = await this.lessonRepository.find({
      where: {
        hostId: id,
        date: Between(startOfWeekDate, endOfWeekDate),
      },
    });

    return lessons.map((lesson) => this.toLessonModel(lesson));
  }

  async findById(id: string): Promise<LessonM> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new HttpException(
        {
          status: 404,
          error: 'Lesson not found',
        },
        404,
      );
    }

    return this.toLessonModel(lesson);
  }

  private toLessonEntity(createLessontDto: CreateLessonDto): Lesson {
    const lessonEntity = new Lesson();

    lessonEntity.hostId = createLessontDto.hostId;
    lessonEntity.title = createLessontDto.title;
    lessonEntity.type = createLessontDto.type;
    lessonEntity.description = createLessontDto.description;
    lessonEntity.date = new Date(createLessontDto.date);
    lessonEntity.instructorId = createLessontDto.instructorId;
    lessonEntity.maxParticipants = createLessontDto.maxParticipants;
    lessonEntity.startTime = createLessontDto.startTime;
    lessonEntity.endTime = createLessontDto.endTime;
    lessonEntity.levelRequired = createLessontDto.levelRequired;

    return lessonEntity;
  }

  private toLessonModel(lessonEntity: Lesson): LessonM {
    const lessonModel = new LessonM();

    lessonModel.id = lessonEntity.id;
    lessonModel.hostId = lessonEntity.hostId;
    lessonModel.title = lessonEntity.title;
    lessonModel.type = lessonEntity.type;
    lessonModel.description = lessonEntity.description;
    lessonModel.date = lessonEntity.date;
    lessonModel.instructorId = lessonEntity.instructorId;
    lessonModel.maxParticipants = lessonEntity.maxParticipants;
    lessonModel.participants = lessonEntity.participants;
    lessonModel.startTime = lessonEntity.startTime;
    lessonModel.endTime = lessonEntity.endTime;
    lessonModel.levelRequired = lessonEntity.levelRequired;
    lessonModel.createdAt = lessonEntity.createdAt;
    lessonModel.updatedAt = lessonEntity.updatedAt;

    return lessonModel;
  }
}
