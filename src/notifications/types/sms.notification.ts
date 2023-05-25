import { User } from 'src/users/users.entity';
import { Notification } from '../notification.interface';

export class SMSNotification implements Notification {
  send(user: User, message: string): boolean {
    // Perform sms request
    console.log(`user: ${user.name}, message: ${message}, channel: sms`)
    return true;
  }
}