import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { I18nValidationPipe, I18nMiddleware } from 'nestjs-i18n';

const defaultOptions = {
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

const defaultLogFormats = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.ms(),
  winston.format.align(),
  utilities.format.nestLike('__template__', {
    colors: true,
    prettyPrint: true,
  }),
];

async function bootstrap() {
  const instance = winston.createLogger({
    format: winston.format.combine(
      ...defaultLogFormats,
      winston.format.uncolorize(),
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(...defaultLogFormats),
      }),
      new winston.transports.DailyRotateFile({
        filename: 'logs/__template__-%DATE%.log',
        ...defaultOptions,
      }),
      new winston.transports.DailyRotateFile({
        filename: 'logs/__template__-error-%DATE%.log',
        level: 'error',
        ...defaultOptions,
      }),
    ],
    exceptionHandlers: [
      new winston.transports.DailyRotateFile({
        filename: 'logs/__template__-exception-%DATE%.log',
        ...defaultOptions,
      }),
    ],
    rejectionHandlers: [
      new winston.transports.DailyRotateFile({
        filename: 'logs/__template__-rejections-%DATE%.log',
        ...defaultOptions,
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance }),
  });
  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
    }),
  );
  app.use(I18nMiddleware);
  await app.listen(3000);
}
bootstrap();
