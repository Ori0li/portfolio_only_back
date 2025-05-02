import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: '제목은 필수입니다.' })
  @MinLength(2, { message: '2글자 이상 적으세요' })
  @MaxLength(30, { message: '30글자 이하로 적으세요' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '설명은 필수입니다.' })
  @MinLength(2, { message: '2글자 이상 적으세요' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '이미지는 필수입니다.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '깃허브 주소는 필수입니다.' })
  github: string;

  @IsString()
  @IsNotEmpty({ message: '데모 주소는 필수입니다.' })
  demo: string;

  @IsArray()
  @IsNotEmpty({ message: '태그는 필수입니다.' })
  tag: string[];
}
