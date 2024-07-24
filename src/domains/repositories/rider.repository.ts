import { CreateRiderDto } from 'src/infrastructures/dtos/create/create-rider.dto';
import { RiderM } from '../models/Rider';

export interface RiderRepository {
  create(createRiderDto: CreateRiderDto): Promise<RiderM>;
  findById(id: string, req: any): Promise<RiderM>;
}
