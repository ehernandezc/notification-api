import { Notification } from "./notifications.entity";

export interface NotificationListResult {
  data: Notification[];
  totalCount: number;
}