import { User } from 'src/users/users.entity';
import { Notification } from '../notification.interface';

export class PushNotification implements Notification {
  send(user: User, message: string): boolean {
    // Perform push notification
    console.log(`user: ${user.name}, message: ${message}, channel: push`);
    return true;
  }
}