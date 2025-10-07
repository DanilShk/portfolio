import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    type: String,
    example: 'title',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'something',
  })
  @IsString()
  description: string;
}
