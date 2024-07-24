import { InjectRepository } from '@nestjs/typeorm';
import { StableStoreRepository } from 'src/domains/repositories/stable-store.repository';
import { StableStore } from '../entities/stables-store.entity';
import { Repository } from 'typeorm';
import { StableStoreM } from 'src/domains/models/StableStore';
import { HttpException, HttpStatus } from '@nestjs/common';

export class StableStoreRepositoryOrm implements StableStoreRepository {
  constructor(
    @InjectRepository(StableStore)
    private readonly stableStoreRepository: Repository<StableStore>,
  ) {}

  async findByZipcode(zipcode: string): Promise<StableStoreM[]> {
    const stables = await this.stableStoreRepository.find({
      where: { zipcode },
    });
    return stables.map((stable) => this.toStableStoreModel(stable));
  }

  async updateIsUsed(id: number): Promise<StableStoreM> {
    const stable = await this.stableStoreRepository.findOne({ where: { id } });
    if (!stable) {
      throw new HttpException(
        {
          status: 'error',
          code: 404,
          message: 'Stable not found',
          ok: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    stable.isUsed = true;
    await this.stableStoreRepository.save(stable);
    return this.toStableStoreModel(stable);
  }

  private toStableStoreModel(stableStoreEntity: StableStore): StableStoreM {
    const stableStoreModel = new StableStoreM();

    stableStoreModel.id = stableStoreEntity.id;
    stableStoreModel.name = stableStoreEntity.name;
    stableStoreModel.city = stableStoreEntity.city;
    stableStoreModel.zipcode = stableStoreEntity.zipcode;
    stableStoreModel.isUsed = stableStoreEntity.isUsed;

    return stableStoreModel;
  }
}
