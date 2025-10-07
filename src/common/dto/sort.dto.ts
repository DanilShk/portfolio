// sort.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortEnum } from '../enums/sort.enum';

export class SortDto {
  @ApiPropertyOptional({
    type: String,
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  field?: string;

  @ApiPropertyOptional({
    enum: SortEnum,
    example: SortEnum.ASC,
  })
  @IsOptional()
  @IsEnum(SortEnum)
  direction?: SortEnum;
}
