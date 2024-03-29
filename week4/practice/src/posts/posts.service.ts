import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './posts.models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  private posts: Posts[] = [];
  private postId: number = 0;

  createPost(userId: string, createPostDto: CreatePostDto) {
    if (!userId) {
      throw new UnauthorizedException('로그인 안 하셨어요.');
    }

    this.usersService.findOne(userId); // 유저가 없으면 예외처리

    const {content} =  createPostDto;
    this.postId += 1;
    
    const post: Posts = {
      id: this.postId,
      writerId: userId,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.posts.push(post);
    
    return post;
  }

  findAll() { //완
    return this.posts;
  }

  findOne(postId: number) { // 완완
    const post = this.posts.find((post) => post.id === postId);
    if (!post) {
      throw new NotFoundException('해당 id의 포스트는 없어요.');
    }
    return post;
  }

  update(userId: string, postId: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === postId);

    this.usersService.findOne(userId); // 유저가 없으면 예외처리

    if (!userId) {
      throw new UnauthorizedException('로그인 안 하셨어요.');
    }

    if(!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    if (post.writerId !== userId) { //다른 유저로 포스트 수정 - 빠꾸
      throw new UnauthorizedException('회원님은 이 글에 대한 권한이 없습니다.');
    }

    this.posts = this.posts.filter((post) => post.id !== postId); 
    
    //const {content} = updatePostDto;
    
    post.content = updatePostDto.content;
    post.updatedAt = new Date();

    this.posts.push(post);
    return post;
  }

  remove(userId: string, postId: number) {
    const post = this.posts.find((post) => post.id === postId);

    this.usersService.findOne(userId); // 유저가 없으면 예외처리

    if (!userId) {
      throw new BadRequestException('로그인이 안 되어 있어요.');
    }

    if (!post) { // 해당 id의 포스트가 없으면 예외처리
      throw new UnauthorizedException('해당 id의 글이 없습니다.');
    }

    if (post.writerId !== userId) { //다른 유저로 포스트 삭제 - 빠꾸
      throw new UnauthorizedException('회원님은 이 글에 대한 권한이 없습니다.');
    }

    this.posts = this.posts.filter((post) => post.id !== postId); //정상적으로 포스트 삭제

  }
}
