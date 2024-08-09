import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationRepository } from 'src/domains/repositories/organization.repository';
import { Organization } from '../entities/organization.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from '../dtos/create/create-organization.dto';
import { OrganizationM } from 'src/domains/models/Organization';
import { RiderAndStableM } from 'src/domains/models/Stable';
import { StableRepositoryOrm } from './stable.repository';
import { forwardRef, HttpException, Inject } from '@nestjs/common';
import { RiderRepositoryOrm } from './rider.repository';
import { RiderForganizationM } from 'src/domains/models/Rider';

export class OrganizationRepositoryOrm implements OrganizationRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly stableService: StableRepositoryOrm,
    @Inject(forwardRef(() => RiderRepositoryOrm))
    private readonly riderService: RiderRepositoryOrm,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
    req: any,
  ): Promise<OrganizationM> {
    const stable = await this.stableService.findById(
      createOrganizationDto.stableId,
    );

    if (!stable) {
      throw new HttpException(
        {
          status: 'error',
          code: 404,
          error: "L'écurie que vous essayez de rejoindre n'existe pas.",
        },
        404,
      );
    }

    const rider = await this.riderService.findById(
      createOrganizationDto.riderId,
    );

    if (!rider || rider.id !== req.user.sub) {
      throw new HttpException(
        {
          status: 'error',
          code: 404,
          error: "Vous n'êtes pas autorisé à effectuer ceci.",
        },
        404,
      );
    }

    const organizationEntity = this.toOrganizationEntity(createOrganizationDto);
    const saved = await this.organizationRepository.save(organizationEntity);
    return this.toOrganizationModel(saved);
  }

  async findByRiderId(riderId: string): Promise<RiderAndStableM[]> {
    const organizations = await this.organizationRepository.find({
      where: {
        riderId,
      },
    });
    console.log(organizations);

    const organizationsWithStable: RiderAndStableM[] = [];

    for await (const organization of organizations) {
      const id = organization.stableId;
      const stable = await this.stableService.findById(id);
      const data: RiderAndStableM = {
        ...stable,
        status: organization.status,
      };
      organizationsWithStable.push(data);
    }

    return organizationsWithStable;
  }

  async findByStableId(stableId: string): Promise<{
    riders: RiderForganizationM[];
    waitingList: RiderForganizationM[];
  }> {
    const organizations = await this.organizationRepository.find({
      where: {
        stableId,
      },
    });

    const riders: RiderForganizationM[] = [];
    const waitingList: RiderForganizationM[] = [];
    for await (const organization of organizations) {
      const rider = await this.riderService.findById(organization.riderId);
      if (rider) {
        const data: RiderForganizationM = {
          ...rider,
          status: organization.status,
        };
        if (organization.status === 0) {
          waitingList.push(data);
        } else {
          riders.push(data);
        }
      }
    }
    return { riders: riders, waitingList: waitingList };
  }

  private toOrganizationEntity(
    createOrganizationDto: CreateOrganizationDto,
  ): Organization {
    const organizationEntity = new Organization();

    organizationEntity.riderId = createOrganizationDto.riderId;
    organizationEntity.stableId = createOrganizationDto.stableId;

    return organizationEntity;
  }

  private toOrganizationModel(organizationEntity: Organization): OrganizationM {
    const model = new OrganizationM();

    model.id = organizationEntity.id;
    model.riderId = organizationEntity.riderId;
    model.stableId = organizationEntity.stableId;
    model.createdAt = organizationEntity.createdAt;
    model.updatedAt = organizationEntity.updatedAt;

    return model;
  }
}
