import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  create(
    @Headers('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost(userId, createPostDto);
  }

  // @Get()
  // findAll() {
  //   return this.postsService.findAll();
  // }

  @Get(':id')
  findOneByPostId(@Param('id') id: string) {
    return this.postsService.findOneByPostId(+id);
  }

  @Get()
  findByUserId(@Query('userId') userId: string) {
    return this.postsService.findByUserId(userId);
  }

  @Patch(':id')
  update(
    @Headers('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(userId, +id, updatePostDto);
  }

  @Delete(':id')
  remove(@Headers('userId') userId: string, @Param('id') id: string) {
    return this.postsService.removePost(userId, +id);
  }
}
