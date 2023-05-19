import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from './comments/entities/comment.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([PostEntity, CommentEntity])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
