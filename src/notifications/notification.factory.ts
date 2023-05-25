import { Injectable } from '@nestjs/common';
import { Notification } from './notification.interface';
import { SMSNotification } from './types/sms.notification';
import { EmailNotification } from './types/email.notification';
import { PushNotification } from './types/push.notification';
import { CHANNELS } from './notification.constants';

@Injectable()
export class NotificationFactory {
  
  createNotification(channel: string): Notification {
    switch(channel) {
      case CHANNELS.SMS:
        return new SMSNotification();
      case CHANNELS.EMAIL:
        return new EmailNotification();
      case CHANNELS.PUSH_NOTIFICATION:
        return new PushNotification();
      default:
        throw new Error(`Not a valid channel: ${channel}`);
    }
  }
}