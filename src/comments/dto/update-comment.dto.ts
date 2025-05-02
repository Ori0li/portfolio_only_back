import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: '2글자 이상 적으세요' })
  @MaxLength(30, { message: '30글자 이하로 적으세요' })
  author?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: '2글자 이상 적으세요' })
  @MaxLength(500, { message: '500글자 이하로 적으세요' })
  content?: string;
}
