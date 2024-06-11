import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @ApiProperty({
    description: 'user_id',
    example: 'content',
  })
  @Column()
  userId: number;

  @ApiProperty({
    description: '본문',
    example: 'content',
  })
  @Column()
  contents: string;

  @ApiProperty({
    description: '수정일',
    example: '2024-06-11',
  })
  @UpdateDateColumn()
  updateAt: Date;

  @ApiProperty({
    description: '생성일',
    example: '2024-06-11',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '생성일',
    example: '2024-06-11',
  })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
