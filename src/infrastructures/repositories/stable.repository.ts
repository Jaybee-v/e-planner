import { InjectRepository } from '@nestjs/typeorm';
import { Stable } from '../entities/stable.entity';
import { Repository } from 'typeorm';
import { CreateStableDto } from '../dtos/create/create-stable.dto';
import { StableM } from 'src/domains/models/Stable';
import { StableRepository } from 'src/domains/repositories/stable.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { StableStoreRepositoryOrm } from './stable-store.repository';

export class StableRepositoryOrm implements StableRepository {
  constructor(
    @InjectRepository(Stable)
    private readonly stableRepository: Repository<Stable>,
    private readonly stableStoreService: StableStoreRepositoryOrm,
  ) {}

  async create(createStableDto: CreateStableDto): Promise<StableM> {
    const stableEntity = await this.toStableEntity(createStableDto);
    const createdStable = await this.stableRepository.save(stableEntity);
    if (createStableDto.stableStoreId) {
      await this.stableStoreService.updateIsUsed(createStableDto.stableStoreId);
    }
    return this.toStableModel(createdStable);
  }

  async findAll(): Promise<StableM[]> {
    const stables = await this.stableRepository.find();
    return stables.map((stable) => this.toStableModel(stable));
  }

  async findById(id: string): Promise<StableM> {
    const stable = await this.stableRepository.findOne({ where: { id } });
    if (!stable) {
      throw new HttpException(
        {
          status: 404,
          error: 'Stable not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.toStableModel(stable);
  }

  async findByZipcode(zipcode: string): Promise<StableM[]> {
    const stables = await this.stableRepository.find({ where: { zipcode } });
    return stables.map((stable) => this.toStableModel(stable));
  }

  private toStableEntity(createStableDto: CreateStableDto): Stable {
    const stableEntity = new Stable();

    stableEntity.id = createStableDto.id;
    stableEntity.name = createStableDto.name;
    stableEntity.address = createStableDto.address;
    stableEntity.city = createStableDto.city;
    stableEntity.zipcode = createStableDto.zipcode;
    stableEntity.country = createStableDto.country;
    stableEntity.phone = createStableDto.phone;

    return stableEntity;
  }

  private toStableModel(stableEntity: Stable): StableM {
    const stableModel = new StableM();

    stableModel.id = stableEntity.id;
    stableModel.name = stableEntity.name;
    stableModel.address = stableEntity.address;
    stableModel.city = stableEntity.city;
    stableModel.zipcode = stableEntity.zipcode;
    stableModel.country = stableEntity.country;
    stableModel.phone = stableEntity.phone;

    return stableModel;
  }
}
