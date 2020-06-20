import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Comments } from './entities/comments.entity';
import { UserDto } from './dto/UserDto';
import * as jwt from 'jsonwebtoken';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { Posts } from './entities/post.entity';
import { User } from './entities/user.entity';

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

    async getPostComments(postId: string): Promise<Comments[]> {
        const comments = await getRepository(Comments)
            .createQueryBuilder('comments')
            .where("comments.postId = :postId", {postId})
            .leftJoinAndSelect("comments.user", "user")
            .getMany();
        return comments;
    }

    async createComment(comment: CreateCommentDto): Promise<Comments> {

        const post: Posts = await getRepository(Posts)
            .createQueryBuilder('post')
            .where("post.id = :postId", {postId: comment.postId})
            .getOne();

        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :userId', {userId: comment.userId})
            .getOne();
        
        const newComment = new Comments();
        newComment.user = user;
        newComment.post = post;
        newComment.content = comment.content;        
        const commented: Comments = await this.commentsRepository.save(newComment);
        return commented;
    }
}
