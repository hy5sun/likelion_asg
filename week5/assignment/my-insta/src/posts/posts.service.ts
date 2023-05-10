import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UserService) {}
  posts: CreatePostDto[] = [];
  id: number = 0;

  async createPost(createPostDto: CreatePostDto) { // 포스트 작성
    const {content} = createPostDto;
    this.id += 1;

    const post: CreatePostDto = {
      id: this.id,
      content,
      createdAt: new Date(),
    };

    this.posts.push(post);
  }

  async findAll() { // 전체 피드 조회
    return this.posts;
  }

  async findOne(id: number) { // 특정 피드 조회
    const post = this.posts.find((post) => id === post.id);

    if (!post) {
      throw new NotFoundException('해당 id의 포스트는 없어요.');
    }

    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === id);

    this.posts = this.posts.filter((post) => post.id !== id);

    const {content} = updatePostDto;

    post.content = content;
    this.posts.push(post);
  }

  async removePost(id: number) {
    const post = this.posts.find((post)=> post.id === id);
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
