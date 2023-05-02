import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Head } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  
  @Post('/create') // dto 필요
  create(@Headers('userId') userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(userId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }

  @Patch('/update/:postId') // dto 필요
  update(@Headers('userId') userId: string, @Param('postId') postId: number, @Body() updatePostDto: UpdatePostDto) {
    
    return this.postsService.update(userId, postId, updatePostDto);
  }

  @Delete('/delete/:postId')
  remove(@Headers('userId') userId: string, @Param('postId') postId: number) {
    return this.postsService.remove(userId, +postId);
  }
}
