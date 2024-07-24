import { Exclude } from 'class-transformer';

export class UserM {
  id: string;
  email: string;

  @Exclude()
  password: string;

  role: string;
  createdAt: Date;
}
