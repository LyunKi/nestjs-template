import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContextModule } from './context/context.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ContextModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
