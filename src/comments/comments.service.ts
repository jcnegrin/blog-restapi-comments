import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comments.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
      ) {}

      findAll(): Promise<Comments[]> {
        return this.commentsRepository.find();
      }
    
      findOne(id: string): Promise<Comments> {
        return this.commentsRepository.findOne(id);
      }
    
      async remove(id: string): Promise<void> {
        await this.commentsRepository.delete(id);
      }
}
