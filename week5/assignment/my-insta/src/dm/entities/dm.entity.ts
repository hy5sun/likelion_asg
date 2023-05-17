import { CommonEntity } from 'src/common/entities/common.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Dm')
export class DmEntity extends CommonEntity {
  @Column({ nullable: false })
  receiverId: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  writerId: string;

  @ManyToOne(() => UserEntity, (user) => user.userId)
  @JoinColumn({ name: 'receiverId' })
  @JoinColumn({ name: 'writerId' })
  user: UserEntity;
}
