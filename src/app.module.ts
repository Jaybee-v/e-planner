import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { EnvConfigModule } from './infrastructures/config/env-config/env-config.module';
import { UserModule } from './presentations/user/user.module';
import { AuthModule } from './presentations/user/auth/auth.module';
import { StableModule } from './presentations/user/stable/stable.module';
import { EmailModule } from './applications/email/email.module';
@Module({
  imports: [
    EnvConfigModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UserModule,
    AuthModule,
    StableModule,
    EmailModule,
    // CacheModule.register(),
  ],
})
export class AppModule {}
