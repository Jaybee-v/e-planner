import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('newsletter')
export default class Newsletter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  email: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('timestamp', { default: () => 'NOW()' })
  createdAt: Date;

  @Column('timestamp', { default: () => 'NOW()' })
  updatedAt: Date;
}
