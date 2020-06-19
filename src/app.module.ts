import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './comments/entities/post.entity';
import { User } from './comments/entities/user.entity';
import { Role } from './comments/entities/role.entity';
import { Comments } from './comments/entities/comments.entity';
import { AuthMiddleware } from './comments/business/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.AWS_MYSQL_HOST,
      port: 3306,
      username: process.env.AWS_MYSQL_USERNAME,
      password: process.env.AWS_MYSQL_PASSWORD,
      database: process.env.AWS_MYSQL_DATABASE,
      entities: [Comments, Posts, User, Role],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      charset: 'utf8mb4'
    }),CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('comments');
  }
}
