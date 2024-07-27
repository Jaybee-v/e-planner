import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStableStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;
}
