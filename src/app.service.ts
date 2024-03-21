import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './context/PrismaService';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}

  async getHello(): Promise<string> {
    await this.cacheManager.set('test', 'settled');
    const test = (await this.cacheManager.get<string>('test')) || 'unsettled';
    return test;
  }
}
