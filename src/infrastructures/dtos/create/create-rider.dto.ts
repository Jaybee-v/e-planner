import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRiderDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Lastname is required' })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'Zipcode is required' })
  zipcode: string;

  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;
}
