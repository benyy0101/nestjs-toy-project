import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(5)
  @ApiProperty({
    description: '이름',
    required: true,
    example: '홍길동',
  })
  name: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  title: string;
}
