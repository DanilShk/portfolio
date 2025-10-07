// sort.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortEnum } from '../enums/sort.enum';

export class SortDto {
  @ApiPropertyOptional({
    type: String,
    example: 'createdAt',
    description: 'Field to sort by (e.g., createdAt)',
  })
  @IsOptional()
  @IsString()
  field?: string;

  @ApiPropertyOptional({
    enum: SortEnum,
    example: SortEnum.ASC,
    description: 'Sort direction: ASC or DESC',
  })
  @IsOptional()
  @IsEnum(SortEnum)
  direction?: SortEnum;
}
