import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { NotificationFactory } from './notification.factory';
import { NotificationService } from './notification.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notifications.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Notification
    ]),
  ],
  providers: [NotificationService, NotificationFactory],
  controllers: [NotificationsController]
})
export class NotificationsModule {}