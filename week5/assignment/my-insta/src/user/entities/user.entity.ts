import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { CommentEntity } from '../../posts/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity('User')
export class UserEntity extends CommonEntity {
  @Column({ length: 30 })
  name: string;

  @Column({ unique: true, nullable: false })
  userId: string;

  @IsEmail()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ length: 30 })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.writerId)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.id)
  comments: CommentEntity[];
}
