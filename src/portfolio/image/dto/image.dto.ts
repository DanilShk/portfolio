import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';
import { SortDto } from 'src/common/dto/sort.dto';

export class CreateImageDto {
  @ApiProperty({
    type: String,
    example: randomUUID(),
    description: 'Portfolio ID the image belongs to (UUID)',
  })
  @IsUUID()
  portfolioId: string;

  @ApiProperty({
    type: String,
    example: 'title',
    description: 'Image name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'description',
    description: 'Image description',
  })
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FindAllDto extends SortDto {}
