import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Channel } from '../channels/channel.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @ManyToMany(() => Category, { eager: true})
  @JoinTable({ 
    name: 'users_categories',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  subscribedCategories: Category[];

  @ManyToMany(() => Channel, { eager: true})
  @JoinTable({ 
    name: 'users_channels',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'channel_id', referencedColumnName: 'id' },
  })
  channels: Channel[];
}
