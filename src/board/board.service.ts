import { Injectable } from '@nestjs/common';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  private boards = [
    {
      name: 'TAESOO KIm',
      title: 'hello world',
      content: 'Content 1',
      id: 1,
    },
    {
      name: 'TAESOO KIm',
      title: 'hello world',
      content: 'Content 2',
      id: 2,
    },
    {
      name: 'TAESOO KIm',
      title: 'hello world',
      content: 'Content 3',
      id: 3,
    },
    {
      name: 'TAESOO KIm',
      title: 'hello world',
      content: 'Content 4',
      id: 4,
    },
    {
      name: 'TAESOO KIm',
      title: 'hello world',
      content: 'Content 5',
      id: 5,
    },
  ];
  findAll() {
    return this.boards;
  }

  findById(id: number) {
    const board = this.boards.find((item) => item.id === id);
    return board || -1; // Return the found board or -1 if not found
  }

  create(data: any): CreateBoardDto {
    try {
      const newBoard = { id: this.getNextId(), ...data };

      this.boards.push(newBoard);
      return newBoard;
    } catch (e) {}
  }

  getNextId() {
    return Number(this.boards.length + 1);
  }

  update(id: number, data: any): UpdateBoardDto {
    const idx = this.getBoardById(id);
    if (idx > -1) {
      this.boards[idx] = { ...this.boards[idx], ...data };
    }
    return this.boards[idx];
  }

  delete(id: number) {
    this.boards = this.boards.filter((item) => item.id !== id);
  }

  getBoardById(id: number) {
    return this.boards.findIndex((item) => item.id === id);
  }
}
