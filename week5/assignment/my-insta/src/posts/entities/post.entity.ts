import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CommentEntity } from '../comments/entities/comment.entity';

@Entity('Post')
export class PostEntity extends CommonEntity {
  @Column({ nullable: false })
  content: string;

  @Column()
  writerId: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
