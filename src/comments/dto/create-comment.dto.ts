import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: '작성자는 필수입니다.' })
  @MinLength(2, { message: '2글자 이상 적으세요' })
  @MaxLength(30, { message: '30글자 이하로 적으세요' })
  author: string;

  @IsString()
  @IsNotEmpty({ message: '내용은 필수입니다.' })
  @MinLength(2, { message: '2글자 이상 적으세요' })
  @MaxLength(500, { message: '500글자 이하로 적으세요' })
  content: string;

  @IsInt()
  @Min(1, { message: '1 이상의 숫자 부탁' })
  @Type(() => Number)
  project: number;
}
