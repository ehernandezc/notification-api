import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { Channel } from './channel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel
    ]),
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController]
})
export class ChannelsModule {}