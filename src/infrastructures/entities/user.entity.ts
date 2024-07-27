import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Index('user_email_idx')
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { default: 'user' })
  role: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;
}
