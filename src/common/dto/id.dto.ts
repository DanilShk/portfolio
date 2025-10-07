import { IsUUID } from 'class-validator';

export class IdUUIDDto {
  @IsUUID()
  id: string;
}
