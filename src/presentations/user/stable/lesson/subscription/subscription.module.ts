import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';
import { RiderModule } from 'src/presentations/user/rider/rider.module';

@Module({
  imports: [RepositoriesModule, forwardRef(() => RiderModule)],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
