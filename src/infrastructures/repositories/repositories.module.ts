import { Module } from '@nestjs/common';
import { TypeormConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryOrm } from './user.repository';
import { AuthService } from 'src/presentations/user/auth/auth.service';
import { Rider } from '../entities/rider.entity';
import { RiderRepositoryOrm } from './rider.repository';
import { StableStore } from '../entities/stables-store.entity';
import { StableStoreRepositoryOrm } from './stable-store.repository';
import { Stable } from '../entities/stable.entity';
import { StableRepositoryOrm } from './stable.repository';
import Newsletter from '../entities/newsletter.entity';
import { NewsletterRepositoryOrm } from './newsletter.repository';
import { Instructor } from '../entities/instructor.entity';
import { InstructorRepositoryOrm } from './instructor.repository';

@Module({
  imports: [
    TypeormConfigModule,
    TypeOrmModule.forFeature([
      User,
      Rider,
      StableStore,
      Stable,
      Newsletter,
      Instructor,
    ]),
  ],
  providers: [
    UserRepositoryOrm,
    RiderRepositoryOrm,
    StableStoreRepositoryOrm,
    StableRepositoryOrm,
    NewsletterRepositoryOrm,
    InstructorRepositoryOrm,
    AuthService,
  ],
  exports: [
    UserRepositoryOrm,
    RiderRepositoryOrm,
    StableStoreRepositoryOrm,
    StableRepositoryOrm,
    NewsletterRepositoryOrm,
    InstructorRepositoryOrm,
    AuthService,
  ],
})
export class RepositoriesModule {}
