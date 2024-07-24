import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domains/config/database.interface';

@Injectable()
export class EnvConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return process.env.DATABASE_HOST as string;
  }

  getDatabasePort(): number {
    return parseInt(process.env.DATABASE_PORT as string);
  }

  getDatabaseUsername(): string {
    return process.env.DATABASE_USERNAME as string;
  }

  getDatabasePassword(): string {
    return process.env.DATABASE_PASSWORD as string;
  }

  getDatabaseName(): string {
    return process.env.DATABASE_NAME as string;
  }

  getSynchronize(): boolean {
    return process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false;
  }
}
