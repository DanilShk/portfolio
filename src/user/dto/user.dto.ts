import { PickType } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/create-auth.dto';

export class DeleteAccountDto extends PickType(LoginDto, [
  'password',
] as const) {}
