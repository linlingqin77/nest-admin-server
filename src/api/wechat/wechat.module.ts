import { Module } from '@nestjs/common';
import { WeChatService } from './wechat.service';
import { WeChatController } from './wechat.controller';

@Module({
  controllers: [WeChatController],
  providers: [WeChatService]
})
export class WechatModule { }
