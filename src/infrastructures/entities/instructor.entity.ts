import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('instructors')
export class Instructor {
  @Index()
  @PrimaryColumn('varchar', { unique: true })
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  lastname: string;

  @Column()
  birthdate: Date;

  @Column('varchar', { length: 10 })
  phone: string;

  @Column('varchar', { length: 100 })
  stableId: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
