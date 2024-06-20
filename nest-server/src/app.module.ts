import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { DemoModule } from './modules/demo/demo.module';
@Module({
  imports: [SharedModule, DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
