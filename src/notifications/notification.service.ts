import { Injectable, Inject } from '@nestjs/common';
import { NotificationFactory } from './notification.factory';
import { User } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notifications.entity';
import { NotificationListResult } from './notificationsListResult.interface';

@Injectable()
export class NotificationService {
  
  constructor(
    @Inject(NotificationFactory)
    private readonly notificationFactory: NotificationFactory,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  public async sendNotification(categoryId: number, message: string): Promise<NotificationListResult> {
    const usersToNotify = await this.userRepository
    .createQueryBuilder('user')
    .innerJoin('user.subscribedCategories', 'categories')
    .innerJoinAndSelect('user.channels', 'channel')
    .where('categories.id = :categoryId', { categoryId: categoryId })
    .getMany();
  
    const notificationsToSave = [];

    usersToNotify?.map((user) => {
      user?.channels?.map((channel) => {
        const notification = this.notificationFactory.createNotification(channel.name);
        const wasSent = notification.send(user, message);
        if (wasSent) {
          notificationsToSave.push({
            userId: user.id,
            categoryId: categoryId,
            channelId: channel.id,
            message,
          });
        }
      });
    });

    const notificationsSaved = await Promise.all(
      notificationsToSave.map((notificationData) => this.notificationRepository.save(notificationData))
    );
    const test = notificationsSaved.map((n) => n.id);
    return await this.getNotifications(null, null, test);
  }

  public async getNotifications(offset: number | null = 0, limit: number | null = 10, notificationIds?: number[]): Promise<NotificationListResult> {
    const totalCount = await this.notificationRepository.count();

    let notificationQuery = this.notificationRepository
      .createQueryBuilder('notification')
      .innerJoinAndSelect('notification.user', 'user')
      .innerJoinAndSelect('notification.category', 'category')
      .innerJoinAndSelect('notification.channel', 'channel');
    
    if (Number.isInteger(offset)) {
      notificationQuery = notificationQuery.skip(offset);
    }

    if (Number.isInteger(limit)) {
      notificationQuery = notificationQuery.take(limit);
    }
      
    notificationQuery = notificationQuery.orderBy({'notification.id': 'DESC'});
    
    if (notificationIds?.length > 0) {
      notificationQuery = notificationQuery.where('notification.id in (:notificationIds)', {notificationIds});
    }

    const notifications = await notificationQuery.getMany();

    return {
      totalCount,
      data: notifications,
    }
  }
}
