import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

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
  @Column({ length: 300 })
  password: string;

  @ApiProperty({
    description: '생성글',
  })
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
