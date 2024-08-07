import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateLessonSubscriptionDto } from 'src/infrastructures/dtos/create/create-lesson-subscritpion.dto';
import { LessonSubscriptionRepositoryOrm } from 'src/infrastructures/repositories/lesson-subscription.repository';
import { AuthGuard } from 'src/presentations/user/auth/auth.guard';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly lessonSubscriptionService: LessonSubscriptionRepositoryOrm,
  ) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() createLessonSubscription: CreateLessonSubscriptionDto,
    @Req() req: any,
  ) {
    try {
      const result = await this.lessonSubscriptionService.create(
        createLessonSubscription,
        req,
      );
      return {
        status: 'success',
        message: 'Votre inscription a bien été enregsitrée.',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: error.response ? error.response.error : error.message,
      };
    }
  }
}
