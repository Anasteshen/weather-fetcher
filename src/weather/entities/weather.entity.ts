import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'weather',
})
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  part: string;

  @Column('jsonb', { default: {} })
  data: string;
}
