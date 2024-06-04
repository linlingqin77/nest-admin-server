import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';

@Module({
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
