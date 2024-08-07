import { CreateOrganizationDto } from 'src/infrastructures/dtos/create/create-organization.dto';
import { OrganizationM } from '../models/Organization';
import { StableM } from '../models/Stable';

export interface OrganizationRepository {
  create(
    createOrganizationDto: CreateOrganizationDto,
    req: any,
  ): Promise<OrganizationM>;
  findByRiderId(riderId: string): Promise<StableM[]>;
}
