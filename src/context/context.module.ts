import { Global, Logger, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  I18nModule,
  QueryResolver,
  AcceptLanguageResolver,
  HeaderResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { PrismaService } from './PrismaService';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: join(__dirname, '../i18n/'),
          watch: true,
        },
        fallbacks: {
          'en-*': 'en',
          'en_*': 'en',
          'zh-*': 'zh',
          'zh_*': 'zh',
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
        new CookieResolver(['lang']),
      ],
      inject: [ConfigService],
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: process.env.LOCALHOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
    } as any),
  ],
  providers: [Logger, PrismaService],
  exports: [Logger, PrismaService],
})
export class ContextModule {}
