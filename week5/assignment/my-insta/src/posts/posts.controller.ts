import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  create(@Headers('userId') userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(userId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOneByPostId(@Param('id') id: string) {
    return this.postsService.findOneByPostId(+id);
  }

  @Get('/user/:userId') // RESTful 하지 않는 것 같지만.. 앞에 /user/를 지워버리면 findOneByPostId 가 실행됨..
  findOneByUserId(@Param('userId') userId: string) {
    return this.postsService.findOneByUserId(userId);
  } 

  @Patch('update/:id')
  update(@Headers('userId') userId: string, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(userId, +id, updatePostDto);
  }

  @Delete('delete/:id')
  remove(@Headers('userId') userId: string, @Param('id') id: string) {
    return this.postsService.removePost(userId, +id);
  }
}
