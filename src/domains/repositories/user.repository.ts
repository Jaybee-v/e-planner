import { CreateUserDto } from 'src/infrastructures/dtos/create/create-user.dto';
import { UserM } from '../models/User';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<UserM>;
  findByEmail(email: string): Promise<UserM | null>;
  findById(id: string): Promise<UserM>;
  findAll(): Promise<UserM[]>;
}
