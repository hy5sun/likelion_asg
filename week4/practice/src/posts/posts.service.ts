import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.models';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  createPost(userId: string, createPostDto: CreatePostDto) {
    const {content} =  createPostDto;
    
    const post: Post = {
      content,
      id: this.posts.length + 1,
      writerId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.posts.push(post);
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
    const {content} = updatePostDto;

    const post = this.posts.find((post) => post.id === postId && post.writerId === userId);

    if(!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    if (post.writerId !== userId) { //다른 유저로 포스트 수정 - 빠꾸
      throw new UnauthorizedException('회원님은 이 글에 대한 권한이 없습니다.');
    }

    this.posts = this.posts.filter((post) => post.id === postId && post.writerId === userId); 
    
    post.content = content; //정상적으로 포스트 수정

    this.posts.push(post);
    return post;
  }

  remove(userId: string, postId: number) {
    const post = this.posts.find((post) => post.id === postId && post.writerId === userId);

    if (!userId) {
      throw new BadRequestException('로그인이 안 되어 있어요.');
    }

    if (!post) { // 해당 아이디로 된 포스트가 없다면 빠꾸
      throw new UnauthorizedException('회원님은 이 글에 대한 권한이 없습니다.');
    }

    if (post.writerId !== userId) { //다른 유저로 포스트 삭제 - 빠꾸
      throw new UnauthorizedException('회원님은 이 글에 대한 권한이 없습니다.');
    }

    this.posts = this.posts.filter((post) => post.id === postId); //정상적으로 포스트 삭제
  }
}
