import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { CommentEntity } from '../../posts/comments/entities/comment.entity';
import { DmEntity } from 'src/dm/entities/dm.entity';

@Entity('User')
export class UserEntity {
  @Column({ length: 30 })
  name: string;

  @PrimaryColumn({ unique: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @IsEmail()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ length: 30 })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.writerId)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.writerId)
  comments: CommentEntity[];

  @OneToMany(() => DmEntity, (dm) => dm.writerId)
  directMessages: DmEntity[];
}
