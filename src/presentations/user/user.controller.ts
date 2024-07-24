import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructures/dtos/create/create-user.dto';
import { UserRepositoryOrm } from 'src/infrastructures/repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserRepositoryOrm) {}
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return {
        status: 'success',
        code: 201,
        message: 'User created successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        return {
          status: 'error',
          code: 409,
          message: 'User already exist',
        };
      }
      this.errorResponse(error);
    }
  }

  @Get('')
  async findAll() {
    try {
      const result = await this.userService.findAll();
      return {
        status: 'success',
        code: 200,
        message: 'Users retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      this.errorResponse(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const result = await this.userService.findById(id);
      return {
        status: 'success',
        code: 200,
        message: 'User retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      this.errorResponse(error);
    }
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      const result = await this.userService.findByEmail(email);
      return {
        status: 'success',
        code: 200,
        message: 'User retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      this.errorResponse(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.userService.delete(id);
      return {
        status: 'success',
        code: 200,
        message: 'User deleted successfully',
      };
    } catch (error) {
      console.log(error);
      this.errorResponse(error);
    }
  }

  private errorResponse(error: any) {
    return {
      status: 'error',
      code: error.status,
      message: error.response.error,
      data: error.response.data,
    };
  }
}
