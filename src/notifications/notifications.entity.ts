import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Category } from '../categories/categories.entity';
import { Channel } from '../channels/channel.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  @Column()
  channelId: number;

  @Column()
  createdAt: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Channel)
  @JoinColumn({ name: 'channel_id' })
  channel: Channel;
}
