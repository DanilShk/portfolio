import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';
import { SortDto } from 'src/common/dto/sort.dto';

export class CreateImageDto {
  @ApiProperty({
    type: String,
    example: randomUUID(),
  })
  @IsUUID()
  portfolioId: string;

  @ApiProperty({
    type: String,
    example: 'title',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'description',
  })
  @IsString()
  description: string;
}

export class FindAllDto extends SortDto {}
