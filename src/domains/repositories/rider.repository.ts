import { CreateRiderDto } from 'src/infrastructures/dtos/create/create-rider.dto';
import { RiderM } from '../models/Rider';

export interface RiderRepository {
  create(createRiderDto: CreateRiderDto): Promise<RiderM>;
  findById(id: string): Promise<RiderM | null>;
  findByIdHimself(id: string, req: any): Promise<RiderM>;
}
