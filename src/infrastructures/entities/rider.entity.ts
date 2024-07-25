import { Column, Entity, Index } from 'typeorm';
@Entity('riders')
export class Rider {
  @Index()
  @Column('uuid', { primary: true })
  id: string;

  @Index()
  @Column('varchar')
  name: string;

  @Index()
  @Column('varchar')
  lastname: string;

  @Index()
  @Column('int')
  level: number;

  @Column()
  birthdate: Date;

  @Column('varchar')
  address: string;

  @Index()
  @Column('varchar')
  zipcode: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  country: string;

  @Column('varchar')
  phone: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
