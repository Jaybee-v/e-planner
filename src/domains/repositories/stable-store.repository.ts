import { StableStoreM } from '../models/StableStore';

export interface StableStoreRepository {
  findByZipcode(zipcode: string): Promise<StableStoreM[]>;
  create(stableStoreName: string): Promise<any>;
}
