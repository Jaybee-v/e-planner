import { Column, Entity, Index } from 'typeorm';

@Entity('stables')
export class Stable {
  @Index('stable_id_idx')
  @Column('uuid', { primary: true })
  id: string;

  @Index('stable_name_idx')
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  address: string;

  @Column('varchar', { length: 255 })
  city: string;

  @Index()
  @Column('varchar', { length: 5 })
  zipcode: string;

  @Column('varchar', { length: 255 })
  country: string;

  @Column('varchar', { length: 255 })
  phone: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
