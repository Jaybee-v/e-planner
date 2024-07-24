import { CreateStableDto } from 'src/infrastructures/dtos/create/create-stable.dto';
import { StableM } from '../models/Stable';

export interface StableRepository {
  create(createStableDto: CreateStableDto): Promise<StableM>;
  findAll(): Promise<StableM[]>;
}
