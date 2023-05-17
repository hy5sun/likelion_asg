import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../../common/entities/common.entity';
import { UserEntity } from '../../../user/entities/user.entity';
import { PostEntity } from '../../entities/post.entity';

@Entity('Comment')
export class CommentEntity extends CommonEntity {
  @Column({ nullable: false })
  writerId: string;

  @Column({ nullable: false })
  postId: string;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'writerId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: PostEntity;
}
