import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStableDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'Zipcode is required' })
  zipcode: string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;
}
