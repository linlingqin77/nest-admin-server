import { PartialType } from '@nestjs/swagger';
import { CreateWechatDto } from './create-wechat.dto';

export class UpdateWechatDto extends PartialType(CreateWechatDto) {}
