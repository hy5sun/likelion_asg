import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  exports: [],
  controllers: [PostsController],
  providers: [PostsService, UsersService]
})
export class PostsModule {}
