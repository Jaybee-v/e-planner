import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InstructorRepositoryOrm } from 'src/infrastructures/repositories/instructor.repository';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateInstructorDto } from 'src/infrastructures/dtos/create/create-instructor';
import { UpdateInstructorDto } from 'src/infrastructures/dtos/update/update-instructor';

@Controller('stable/instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorRepositoryOrm) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() createInstructorDto: CreateInstructorDto,
    @Request() req: any,
  ) {
    try {
      if (req.user.role !== 'stable') {
        return {
          status: 'error',
          code: 401,
          message: 'You are not authorized to access this resource',
        };
      }
      if (req.user.sub !== createInstructorDto.id) {
        return {
          status: 'error',
          code: 401,
          message: 'You are not authorized to access this resource',
        };
      }
      const result = await this.instructorService.create(createInstructorDto);
      return {
        status: 'success',
        code: 201,
        message: 'Instructor created successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: 'error',
        code: error.code,
        message: 'Internal server error',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      console.log('ICI ?');

      const result = await this.instructorService.findById(id);
      return {
        status: 'success',
        code: 200,
        message: 'Instructor retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);

      return {
        status: 'error',
        code: error.code,
        message: error.response
          ? error.response.error
          : 'Internal server error',
      };
    }
  }

  @Get('by-stable/:id')
  async findByStableId(@Param('id') id: string) {
    try {
      console.log('hello');

      const result = await this.instructorService.findByStableId(id);
      return {
        status: 'success',
        code: 200,
        message: 'Instructors retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);

      return {
        status: 'error',
        code: error.code,
        message: error.response
          ? error.response.error
          : 'Internal server error',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
    @Request() req: any,
  ) {
    try {
      const reqID = req.user.sub;
      const result = await this.instructorService.update(
        id,
        updateInstructorDto,
        reqID,
      );
      return {
        status: 'success',
        code: 200,
        message: 'Instructor updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: 'error',
        code: error.code,
        message: error.response
          ? error.response.error
          : 'Internal server error',
      };
    }
  }
}
