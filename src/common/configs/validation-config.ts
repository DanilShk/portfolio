import { ValidationPipeOptions } from '@nestjs/common';

export const validationConfig: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidUnknownValues: true,
  disableErrorMessages: process.env.NODE_ENV !== 'production' ? true : false,
};
