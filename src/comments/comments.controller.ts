import { Controller, Get, Headers, BadRequestException } from '@nestjs/common';
import { UserData } from './business/UserData.decorator';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { CreateComment } from './business/CreateComment.decorator';
import { Comments } from './entities/comments.entity';
import { UserDto } from './dto/UserDto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    @Get()
    async getPostComments(@Headers('authorization') bearer_token: string, @CreateComment() comment: CreateCommentDto): Promise<Comments[]> {
        if (!comment.userId || !comment.postId || !comment.content) {
            throw new BadRequestException('Invalid comment data received');
        }

        const user: UserDto = await this.commentsService.getUserData(bearer_token);
        return ;
    }
}
