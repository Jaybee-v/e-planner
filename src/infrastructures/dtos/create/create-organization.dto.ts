import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  riderId: string;

  @IsString()
  @IsNotEmpty()
  stableId: string;
}
