import { Controller, Get, Headers, BadRequestException, Param, Post } from '@nestjs/common';
import { UserData } from './business/UserData.decorator';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { CreateComment } from './business/CreateComment.decorator';
import { Comments } from './entities/comments.entity';
import { UserDto } from './dto/UserDto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    @Get(':postId')
    async getPostComments(@Param('postId') id: string): Promise<Comments[]> {
        if (!id) {
            throw new BadRequestException('Invalid post ID');
        }
        const comments: Comments[] = await this.commentsService.getPostComments(id);
        return comments;
    }


    @Post()
    createComment(@CreateComment() comment: CreateCommentDto): Promise<Comments>{
        if (!comment.postId) 
            throw new BadRequestException('Invalid Post Id');
        if (!comment.userId) 
            throw new BadRequestException('Invalid User Id');
        if (!comment.content)
            throw new BadRequestException('Invalid comment content provided');

        return this.commentsService.createComment(comment);
    }
}
