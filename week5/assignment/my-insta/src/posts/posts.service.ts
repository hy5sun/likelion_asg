import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from 'src/user/user.service';
import { Comment } from './comments/comments.models';
import { CreateCommentDto } from './comments/dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './comments/entities/comment.entity';
import AWS from 'aws-sdk';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<Comment>,
  ) {}

  // 포스트 작성
  async createPost(
    userId: string,
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });

    // AWS s3 객체 생성
    const s3 = new AWS.S3();

    // 파일 업로드 시 필요한 정보들을 모아둔 객체 생성
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: String(file.originalname),
      Body: file.buffer,
    };

    const response = await s3.upload(params).promise();

    const post = new PostEntity();
    post.content = createPostDto.content;
    post.writerId = userId;
    post.url = response.Location;

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    await this.postsRepository.save(post);
  }

  // 특정 피드 조회
  async findOneByPostId(id: string) {
    const post = this.postsRepository.findOne({
      where: { id: id },
    });

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    return post;
  }

  // 특정 유저 글 조회
  async findByUserId(userId: string) {
    const ownPost = await this.postsRepository.find({
      where: { writerId: userId },
    });

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    if (!ownPost) {
      console.log('유저가 작성한 글이 없어서 전체 피드를 제공해드려요');
      return this.postsRepository;
    }

    return ownPost;
  }

  // 특정 피드 수정
  async updatePost(userId: string, id: string, content: string) {
    const post = await this.postsRepository.findOne({
      where: { id: id },
    });

    post.content = content;

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    if ((await post).writerId !== userId) {
      throw new UnauthorizedException('해당 글에 접근할 권한이 없습니다.');
    }

    await this.postsRepository.save(post);
  }

  // 특정 피드 삭제
  async removePost(userId: string, postId: string) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    if (post.writerId !== userId) {
      throw new UnauthorizedException('해당 글에 접근할 권한이 없습니다.');
    }

    await this.postsRepository.delete({ id: postId });
  }
  // 댓글달기
  async createComment(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const { content } = createCommentDto;

    const comment = new CommentEntity();
    comment.content = content;
    comment.writerId = userId;
    comment.postId = postId;

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요');
    }

    this.userService.findUser(userId); // 유저가 없으면 예외 처리

    await this.commentsRepository.save(comment);
  }

  async findByPostId(postId: string) {
    const comment = await this.commentsRepository.find({
      where: { postId: postId },
    });

    if (!comment) {
      throw new NotFoundException('해당 게시물에는 댓글이 없습니다.');
    }

    return comment;
  }
}
