import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsOptional, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  title?: string;

  @IsOptional()
  @IsString({ message: '설명은 문자열이어야 합니다.' })
  description?: string;

  @IsOptional()
  @IsString({ message: '이미지는 문자열이어야 합니다.' })
  image?: string;

  @IsOptional()
  @IsString({ message: '깃허브 주소는 문자열이어야 합니다.' })
  github?: string;

  @IsOptional()
  @IsString({ message: '데모 주소는 문자열이어야 합니다.' })
  demo?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: '태그는 필수입니다.' })
  @IsString({ each: true, message: '태그는 문자열 배열이어야 합니다.' })
  tag?: string[];
}
