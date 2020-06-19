import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comments.entity';
import { UserDto } from './dto/UserDto';
import * as jwt from 'jsonwebtoken';
import { CreateCommentDto } from './dto/CreateCommentDto';

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

      async getUserData(authorizationToken: string): Promise<UserDto> {
        const bearer_token = authorizationToken.split(' ');
        const token = bearer_token[1];
        const userInfo: UserDto = await jwt.verify(token, process.env.JWT_SECRET) as UserDto;
        return userInfo;
    }

    createComment(user: UserDto, postId: string, comment: CreateCommentDto): Promise<void> {
        return ;
    }
}
