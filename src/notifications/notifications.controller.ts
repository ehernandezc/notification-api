import { Controller, Post, Get, Body, ValidationPipe, UsePipes, InternalServerErrorException, Query } from '@nestjs/common';
import { NotificationDto } from './notification.dto';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationsController {

  private readonly notificationsService: NotificationService;

  constructor(notificationsService: NotificationService) {
    this.notificationsService = notificationsService;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async sendNotification(@Body() notificationDto: NotificationDto) {
    try {

      const { categoryId, message } = notificationDto;
      return await this.notificationsService.sendNotification(categoryId, message);
    } catch(err) {
      throw new InternalServerErrorException(err, 'Error ocurred trying to send notification');
    }
  }

  @Get()
  async getNotifications(@Query('offset') offset: number, @Query('limit') limit: number) {
    try {
      return await this.notificationsService.getNotifications(+offset, +limit);
    } catch(err) {
      throw new InternalServerErrorException(err, 'Error ocurred trying to retrieve notifications');
    }
  }
}