import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { Post } from './posts.models';
import { Comment } from './comments/comments.models';
import { CreateCommentDto } from './comments/dto/create-comment.dto';
import * as uuid from 'uuid';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UserService) {}
  posts: Post[] = [];
  comments: Comment[] = [];

  async createPost(userId: string, createPostDto: CreatePostDto) {
    // 포스트 작성
    const { content } = createPostDto;

    const post: Post = {
      id: uuid,
      content,
      writer: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    this.posts.push(post);
  }

  // 특정 피드 조회
  async findOneByPostId(id: number) {
    const post = this.posts.find((post) => id === post.id);

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    return post;
  }

  // 특정 유저 글 조회
  async findByUserId(userId: string) {
    const ownPost = this.posts.filter((post) => userId === post.writer);

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    if (!ownPost) {
      console.log('유저가 작성한 글이 없어서 전체 피드를 제공해드려요');
      return this.posts;
    }

    return ownPost;
  }

  // 특정 피드 수정
  async updatePost(userId: string, id: number, updatePostDto: UpdatePostDto) {
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

    const { content } = updatePostDto;

    post.content = content;
    post.updatedAt = new Date();
    this.posts.push(post);
  }

  // 특정 피드 삭제
  async removePost(userId: string, id: number) {
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
  }
  // 댓글달기
  async createComment(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const { content } = createCommentDto;

    const comment: Comment = {
      id: uuid,
      content,
      writerId: userId,
      postId: postId,
    };

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    this.comments.push(comment);
  }

  async findByPostId(postId: string) {
    const comment = this.comments.filter(
      (comment) => postId === comment.postId,
    );

    if (!comment) {
      throw new NotFoundException('해당 게시물에는 댓글이 없습니다.');
    }

    return comment;
  }
}
