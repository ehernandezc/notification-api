import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}