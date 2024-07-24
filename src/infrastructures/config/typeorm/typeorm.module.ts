import { Module } from '@nestjs/common';
import { EnvConfigService } from '../env-config/env-config.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfigModule } from '../env-config/env-config.module';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions =>
  ({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || false,
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeormConfigModule {}
