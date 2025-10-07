import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdUUIDDto {
  @ApiProperty({
    description: 'Resource UUID',
    example: '7b1c2d3e-4f56-7890-ab12-34567890cdef',
  })
  @IsUUID()
  id: string;
}
