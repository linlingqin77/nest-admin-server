import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/system/user/user.module';
import { LoginModule } from './modules/main/main.module';
import { AuthModule } from './modules/system/auth/auth.module';
@Module({
  imports: [SharedModule, UserModule, LoginModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
