import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async getHello(@I18n() i18n: I18nContext): Promise<string> {
    this.logger.log('Calling getHello()', AppController.name);
    this.logger.debug('Calling getHello()', AppController.name);
    this.logger.verbose('Calling getHello()', AppController.name);
    this.logger.warn('Calling getHello()', AppController.name);
    const hello = await this.appService.getHello();
    return `${hello};${await i18n.t('test.hello', { args: { name: 'Lyunki' } })}`;
  }
}
