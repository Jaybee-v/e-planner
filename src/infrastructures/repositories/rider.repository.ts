import { InjectRepository } from '@nestjs/typeorm';
import { RiderRepository } from 'src/domains/repositories/rider.repository';
import { Rider } from '../entities/rider.entity';
import { Repository } from 'typeorm';
import { CreateRiderDto } from '../dtos/create/create-rider.dto';
import { RiderM } from 'src/domains/models/Rider';
import { HttpException, HttpStatus } from '@nestjs/common';

export class RiderRepositoryOrm implements RiderRepository {
  constructor(
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
  ) {}

  async create(createRiderDto: CreateRiderDto): Promise<RiderM> {
    const riderEntity = await this.toRiderEntity(createRiderDto);
    const createdRider = await this.riderRepository.save(riderEntity);
    return this.toRiderModel(createdRider);
  }

  async findById(id: string, req: any): Promise<RiderM> {
    const rider = await this.riderRepository.findOne({ where: { id } });

    if (!rider) {
      throw new HttpException(
        {
          status: 404,
          error: 'Rider not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    console.log('REQUEST', req);

    if (req.user.sub !== rider.id) {
      throw new HttpException(
        {
          status: 401,
          error: 'You are not authorized to access this resource',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.toRiderModel(rider);
  }

  private toRiderEntity(createRiderDto: CreateRiderDto): Rider {
    const riderEntity = new Rider();

    riderEntity.id = createRiderDto.id;
    riderEntity.name = createRiderDto.name;
    riderEntity.lastname = createRiderDto.lastname;
    riderEntity.birthdate = new Date(createRiderDto.birthdate);
    riderEntity.level = createRiderDto.level;
    riderEntity.phone = createRiderDto.phone;
    riderEntity.address = createRiderDto.address;
    riderEntity.zipcode = createRiderDto.zipcode;
    riderEntity.city = createRiderDto.city;
    riderEntity.country = createRiderDto.country;

    return riderEntity;
  }

  private toRiderModel(riderEntity: Rider): RiderM {
    const riderModel = new RiderM();

    riderModel.id = riderEntity.id;
    riderModel.name = riderEntity.name;
    riderModel.lastname = riderEntity.lastname;
    riderModel.birthdate = riderEntity.birthdate;
    riderModel.level = riderEntity.level;
    riderModel.phone = riderEntity.phone;
    riderModel.address = riderEntity.address;
    riderModel.zipcode = riderEntity.zipcode;
    riderModel.city = riderEntity.city;
    riderModel.country = riderEntity.country;
    riderModel.createdAt = riderEntity.createdAt;
    riderModel.updatedAt = riderEntity.updatedAt;

    return riderModel;
  }
}
