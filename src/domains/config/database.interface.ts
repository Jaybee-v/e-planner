export interface DatabaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUsername(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getSynchronize(): boolean;
}
