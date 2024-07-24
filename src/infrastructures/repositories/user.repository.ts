import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domains/repositories/user.repository';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create/create-user.dto';
import { UserM } from 'src/domains/models/User';
import { HttpException, HttpStatus } from '@nestjs/common';
import { hashPassword } from 'src/utils/bcrypt';

export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserM> {
    const userEntity = await this.toUserEntity(createUserDto);
    const createdUser = await this.userRepository.save(userEntity);
    return this.toUserModel(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return this.toPrivateUserEntity(user);
  }

  async findById(id: string): Promise<UserM> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        {
          status: 404,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.toUserModel(user);
  }

  async findAll(): Promise<UserM[]> {
    const users = await this.userRepository.find();

    return users.map((user) => this.toUserModel(user));
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        {
          status: 404,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.remove(user);
  }

  private async toUserEntity(createUserDto: CreateUserDto): Promise<User> {
    const userEntity = new User();

    userEntity.email = createUserDto.email;
    userEntity.password = await hashPassword(createUserDto.password);

    return userEntity;
  }

  private toPrivateUserEntity(userModel: UserM): User {
    const userEntity = new User();

    userEntity.id = userModel.id;
    userEntity.email = userModel.email;
    userEntity.password = userModel.password;
    userEntity.role = userModel.role;
    userEntity.createdAt = userModel.createdAt;

    return userEntity;
  }

  private toUserModel(userEntity: User): UserM {
    const user = new UserM();

    user.id = userEntity.id;
    user.email = userEntity.email;
    user.createdAt = userEntity.createdAt;

    return user;
  }
}
