import { CreateOrganizationDto } from 'src/infrastructures/dtos/create/create-organization.dto';
import { OrganizationM } from '../models/Organization';
import { RiderAndStableM } from '../models/Stable';
import { RiderForganizationM } from '../models/Rider';

export interface OrganizationRepository {
  create(
    createOrganizationDto: CreateOrganizationDto,
    req: any,
  ): Promise<OrganizationM>;
  findByRiderId(riderId: string): Promise<RiderAndStableM[]>;
  findByStableId(stableId: string): Promise<{
    riders: RiderForganizationM[];
    waitingList: RiderForganizationM[];
  }>;
  stableActionOnRider(
    value: number,
    stableID: string,
    riderID: string,
  ): Promise<void>;
}
