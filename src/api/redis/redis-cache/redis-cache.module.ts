import { RedisCacheService } from './redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    /**
     * <CacheModule>的<registerAsync>方法采用 Redis Store 配置进行通信
     * 由于Redis 信息写在配置文件中，所以采用<registerAsync()>方法来处理异步数据，如果是静态数据， 可以使用register
     */
    CacheModule.registerAsync({
      /**
       * isGlobal 属性设置为true 来将其声明为全局模块
       * 当我们将RedisCacheModule在AppModule中导入时， 其他模块就可以直接使用，不需要再次导入
       */
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore, // store 属性值redisStore ，表示'cache-manager-redis-store' 库
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          db: 0, //目标库,
          // auth_pass: configService.get('REDIS_PASSPORT'), // 密码,没有可以不写
        };
      },
    }),
  ],

  controllers: [RedisCacheController],
  providers: [RedisCacheService],
})
export class RedisCacheModule {}
