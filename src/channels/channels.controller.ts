import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {

  private readonly channelsService: ChannelsService;

  constructor(channelsService: ChannelsService) {
    this.channelsService = channelsService;
  }

  @Get()
  async getChannels() {
    try {
      return await this.channelsService.getChannels();
    } catch(err) {
      throw new InternalServerErrorException(err, 'Error ocurred trying to retrieve channels');
    }
  }
}