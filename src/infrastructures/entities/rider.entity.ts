import { Column, Entity, Index } from 'typeorm';
@Entity('riders')
export class Rider {
  @Index()
  @Column('uuid', { primary: true })
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastname: string;

  @Column('int')
  level: number;

  @Column()
  birthdate: Date;

  @Column('varchar')
  address: string;

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
