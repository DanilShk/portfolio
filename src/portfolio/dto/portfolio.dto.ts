import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    type: String,
    example: 'title',
    description: 'Portfolio name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'something',
    description: 'Short portfolio description',
  })
  @IsString()
  description: string;
}
