import { Column, Entity, Index } from 'typeorm';
@Entity('riders')
export class Rider {
  @Index()
  @Column('uuid', { primary: true })
  id: string;

  @Index('rider_name_idx')
  @Column('varchar')
  name: string;

  @Index()
  @Column('varchar')
  lastname: string;

  @Index('rider_level_idx')
  @Column('int')
  level: number;

  @Column()
  birthdate: Date;

  @Column('varchar')
  address: string;

  @Index('rider_zipcode_idx')
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
