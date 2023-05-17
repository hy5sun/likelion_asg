import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CommentEntity } from '../comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity('Post')
export class PostEntity extends CommonEntity {
  @Column({ nullable: false })
  content: string;

  @Column()
  writerId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
