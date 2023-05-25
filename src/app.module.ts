import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ChannelsModule } from './channels/channels.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import ormconfig = require('./config/ormconfig');
@Module({
  imports: [
    CategoriesModule,
    ChannelsModule,
    NotificationsModule,
    UsersModule,
    TypeOrmModule.forRoot(ormconfig[0]),
  ],
})
export class AppModule {}
