import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInstructorDto {
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
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;
}
