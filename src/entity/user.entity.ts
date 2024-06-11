import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '이름',
    example: 'admin',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: '유저아이디',
    example: 'admin',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'admin',
  })
  @Column({ select: false })
  password: string;
}
