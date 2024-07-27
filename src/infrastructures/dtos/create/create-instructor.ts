import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Lastname is required' })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
