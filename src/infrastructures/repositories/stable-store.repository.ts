import { InjectRepository } from '@nestjs/typeorm';
import { StableStoreRepository } from 'src/domains/repositories/stable-store.repository';
import { StableStore } from '../entities/stables-store.entity';
import { Repository } from 'typeorm';
import { StableStoreM } from 'src/domains/models/StableStore';

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

  private toStableStoreModel(stableStoreEntity: StableStore): StableStoreM {
    const stableStoreModel = new StableStoreM();

    stableStoreModel.name = stableStoreEntity.name;
    stableStoreModel.city = stableStoreEntity.city;
    stableStoreModel.zipcode = stableStoreEntity.zipcode;

    return stableStoreModel;
  }
}
