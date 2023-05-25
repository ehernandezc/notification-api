import { User } from "src/users/users.entity";

export interface Notification {
  send(user: User, message: string): boolean;
}
