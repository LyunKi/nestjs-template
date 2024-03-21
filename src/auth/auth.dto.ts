import { YupValidationPipe } from 'src/common';
import * as yup from 'yup';

export const SendVerificationCodeSchema = yup.object().shape({
  account: yup.string().strict(),
  type: yup.string().oneOf(['email', 'mobile']),
});

export type SendVerificationCodeDto = yup.InferType<
  typeof SendVerificationCodeSchema
>;

export const SendVerificationCodePipe = new YupValidationPipe(
  SendVerificationCodeSchema,
);
