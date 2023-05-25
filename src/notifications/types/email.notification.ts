import { User } from 'src/users/users.entity';
import { Notification } from '../notification.interface';

export class EmailNotification implements Notification {
  send(user: User, message: string): boolean {
    //Perform smtp interaction here
    console.log(`user: ${user.name}, message: ${message}, channel: email`);
    return true;
  }
}