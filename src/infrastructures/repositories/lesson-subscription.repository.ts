import { InjectRepository } from '@nestjs/typeorm';
import { LessonSubscriptionRepository } from 'src/domains/repositories/lesson-subscription.repository';
import { LessonSubscription } from '../entities/lesson-subscription.entity';
import { Repository } from 'typeorm';
import { CreateLessonSubscriptionDto } from '../dtos/create/create-lesson-subscritpion.dto';
import { LessonSubscriptionM } from 'src/domains/models/LessonSubscription';
import { LessonRepositoryOrm } from './lesson.repository';
import { RiderRepositoryOrm } from './rider.repository';
import { forwardRef, HttpException, Inject } from '@nestjs/common';
import { RiderM } from 'src/domains/models/Rider';

export class LessonSubscriptionRepositoryOrm
  implements LessonSubscriptionRepository
{
  constructor(
    @InjectRepository(LessonSubscription)
    private readonly lessonSubscriptionRepository: Repository<LessonSubscription>,
    private readonly lessonService: LessonRepositoryOrm,
    @Inject(forwardRef(() => RiderRepositoryOrm))
    private readonly riderService: RiderRepositoryOrm,
  ) {}

  async create(
    createLessonSubscriptionDto: CreateLessonSubscriptionDto,
    req: any,
  ): Promise<LessonSubscriptionM> {
    const lesson = await this.lessonService.findById(
      createLessonSubscriptionDto.lessonId,
    );
    if (!lesson) {
      throw new HttpException(
        {
          status: 'error',
          code: 404,
          error: "La leçon que vous essayez de rejoindre n'existe pas.",
        },
        404,
      );
    }

    const rider = await this.riderService.findById(
      createLessonSubscriptionDto.riderId,
    );

    if (!rider || rider.id !== req.user.sub) {
      throw new HttpException(
        {
          status: 'error',
          code: 404,
          error: "Le cavalier que vous essayez d'inscrire n'existe pas.",
        },
        404,
      );
    }
    const lessonParticipants = await this.findSubscriptionByLessonId(
      createLessonSubscriptionDto.lessonId,
    );

    for await (const participant of lessonParticipants) {
      if (participant.riderId === createLessonSubscriptionDto.riderId) {
        throw new HttpException(
          {
            status: 'error',
            code: 404,
            error: 'Vous êtes déjà inscrit à cette leçon.',
          },
          404,
        );
      }
    }

    const lessonSubscriptionEntity = this.toLessonSubscriptionEntity(
      createLessonSubscriptionDto,
    );
    const saved = await this.lessonSubscriptionRepository.save(
      lessonSubscriptionEntity,
    );
    return this.toLessonSubscriptionModel(saved);
  }

  async findSubscriptionByLessonId(
    lessonId: string,
  ): Promise<LessonSubscriptionM[]> {
    const lessonSubscriptions = await this.lessonSubscriptionRepository.find({
      where: { lessonId },
    });
    return lessonSubscriptions.map((lessonSubscription) =>
      this.toLessonSubscriptionModel(lessonSubscription),
    );
  }

  async findSubAndRiderByLessonId(lessonId: string): Promise<RiderM[]> {
    const participantsSub = await this.findSubscriptionByLessonId(lessonId);
    const participants = [];
    for await (const participant of participantsSub) {
      const rider = await this.riderService.findById(participant.riderId);
      if (rider) {
        participants.push(rider);
      }
    }
    return participants;
  }

  private toLessonSubscriptionEntity(
    createLessonSubscriptionDto: CreateLessonSubscriptionDto,
  ): LessonSubscription {
    const lessonSubscription = new LessonSubscription();

    lessonSubscription.riderId = createLessonSubscriptionDto.riderId;
    lessonSubscription.lessonId = createLessonSubscriptionDto.lessonId;

    return lessonSubscription;
  }

  private toLessonSubscriptionModel(
    lessonSubscription: LessonSubscription,
  ): LessonSubscriptionM {
    const lessonSubscriptionM = new LessonSubscriptionM();

    lessonSubscriptionM.id = lessonSubscription.id;
    lessonSubscriptionM.riderId = lessonSubscription.riderId;
    lessonSubscriptionM.lessonId = lessonSubscription.lessonId;
    lessonSubscriptionM.createdAt = lessonSubscription.createdAt;
    lessonSubscriptionM.updatedAt = lessonSubscription.updatedAt;

    return lessonSubscriptionM;
  }
}
