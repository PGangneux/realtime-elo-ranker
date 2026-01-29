import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryColumn()
  id: string;

  @Column({ default: 1000 })
  rank: number;
}