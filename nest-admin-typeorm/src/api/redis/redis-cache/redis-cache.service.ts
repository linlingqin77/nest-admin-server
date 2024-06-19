import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // 存入指定缓存
  cacheSet(key: string, value: string, ttl: number) {
    this.cacheManager.set(key, value, { ttl }, (err) => {
      if (err) throw err;
    });
  }

  // 获取指定缓存
  async cacheGet(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  // 清除指定缓存
  async cacheDel(key: string) {
    return await this.cacheManager.del(key);
  }

  // 清空redis全部缓存
  async cacheClear() {
    return await this.cacheManager.reset();
  }

  // 查询redis全部key
  async cacheStorekey() {
    return await this.cacheManager.store.keys();
  }
}
