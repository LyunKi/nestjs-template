import { Body, Controller, Post } from '@nestjs/common';
import { SendVerificationCodeDto, SendVerificationCodePipe } from './auth.dto';

@Controller('auth')
export class AuthController {
  @Post('verification-code')
  create(
    @Body(SendVerificationCodePipe)
    sendVerificationCodeDto: SendVerificationCodeDto,
  ) {
    return sendVerificationCodeDto;
  }
}
