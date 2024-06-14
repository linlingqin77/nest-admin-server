import { Controller, Get, Query } from '@nestjs/common';
import { WeChatService } from './wechat.service';

@Controller('wechat')
export class WeChatController {
  constructor(private readonly weChatService: WeChatService) { }

  @Get('config')
  async getWeChatConfig(@Query('url') url: string) {
    const config = await this.weChatService.getWeChatConfig(url);
    return {
      appId: this.weChatService.appId,
      ...config,
    };
  }
}
