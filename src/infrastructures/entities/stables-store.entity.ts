import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stable_store')
export class StableStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  city: string;

  @Column('varchar', { length: 5 })
  zipcode: string;
}
