// import { CreateBoardDto } from './create-board.dto';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
// import { PartialType } from '@nestjs/swagger';

export class UpdateBoardDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  content?: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
