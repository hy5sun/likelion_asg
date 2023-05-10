import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UserService) {}
  posts: CreatePostDto[] = [];
  id: number = 0;

  async createPost(userId: string, createPostDto: CreatePostDto) { // 포스트 작성
    const {content} = createPostDto;
    this.id += 1;

    const post: CreatePostDto = {
      id: this.id,
      content,
      writer: userId,
      createdAt: new Date(),
    };

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    this.posts.push(post);
  }

  async findAll() { // 전체 피드 조회
    return this.posts;
  }

  async findOneByPostId(id: number) { // 특정 피드 조회
    const post = this.posts.find((post) => id === post.id);

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    return post;
  }

  async findOneByUserId(userId: string) { // 특정 유저 글 조회
    const ownPost = this.posts.filter((post) => post.writer === userId);

    if (!ownPost) {
      throw new NotFoundException('유저가 작성한 글이 없습니다.');
    }

    return ownPost;
  }

  async updatePost(userId: string, id: number, updatePostDto: UpdatePostDto) { // 특정 피드 수정
    const post = this.posts.find((post) => post.id === id);

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    if (post.writer !== userId) {
      throw new UnauthorizedException('해당 글에 접근할 권한이 없습니다.');
    }

    this.posts = this.posts.filter((post) => post.id !== id);

    const {content} = updatePostDto;

    post.content = content;
    this.posts.push(post);
  }

  async removePost(userId: string, id: number) { // 특정 피드 삭제
    const post = this.posts.find((post)=> post.id === id);

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    if (post.writer !== userId) {
      throw new UnauthorizedException('해당 글에 접근할 권한이 없습니다.');
    }

    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
