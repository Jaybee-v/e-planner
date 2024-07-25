import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateLessonDto } from 'src/infrastructures/dtos/create/create-lesson';
import { LessonRepositoryOrm } from 'src/infrastructures/repositories/lesson.repository';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonRepositoryOrm) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(createLessonDto: CreateLessonDto, @Request() req: any) {
    try {
      if (req.user.sub !== createLessonDto.hostId) {
        return {
          status: 'error',
          code: 401,
          message: 'You are not authorized to access this resource',
        };
      }

      if (req.user.role !== 'stable' || req.user.role !== 'instructor') {
        return {
          status: 'error',
          code: 401,
          message: 'You are not authorized to access this resource',
        };
      }

      const result = await this.lessonService.create(createLessonDto);
      return {
        status: 'success',
        code: 201,
        message: 'Lesson created successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: error.response ? error.response.error : error.error,
      };
    }
  }

  @Get('stable/:id')
  async findByStableId(@Param('id') id: string) {
    try {
      const result = await this.lessonService.findByHostId(id);
      return {
        status: 'success',
        code: 200,
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: error.code,
        message: error.response ? error.response.error : error.error,
      };
    }
  }
}
