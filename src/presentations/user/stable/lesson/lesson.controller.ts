import {
  Body,
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

  @Post('stable-by-date')
  async findByStableId(@Body() body: any) {
    try {
      console.log(body);

      const result = await this.lessonService.findByHostIdForTable(
        body.id,
        body.date,
      );
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
