import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDmDto } from './dto/create-dm.dto';
import { UserService } from 'src/user/user.service';
import { DmEntity } from './entities/dm.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ulid } from 'ulid';

@Injectable()
export class DmService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(DmEntity)
    private directRepository: Repository<DmEntity>,
  ) {}

  async sendDm(userId: string, createDmDto: CreateDmDto) {
    // 디엠 보내기
    const { receiver, content } = createDmDto;
    const dm = new DmEntity();
    dm.id = ulid();
    dm.receiverId = receiver;
    dm.content = content;
    dm.writerId = userId;

    if (!userId) {
      // 로그인 안 되어 있으면 예외 처리
      throw new UnauthorizedException('로그인 해주세요.');
    }

    this.userService.findUser(userId); // 해당 유저가 없으면 예외 처리
    this.userService.findUser(receiver);

    await this.directRepository.save(dm);

    return dm;
  }

  findAllDm(userId: string) {
    // 디엠 목록 조회
    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요.');
    }
    const sentDm = this.directRepository.find({
      where: { writerId: userId },
    }); // 내가 보낸 디엠들로 추리기

    return sentDm;
  }

  findOneById(userId: string, receiverId: string) {
    // 특정 유저와의 디엠 조회

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요.');
    }

    this.userService.findUser(receiverId); // 유저가 없으면 예외 처리

    const dm = this.directRepository.find({
      where: { writerId: userId, receiverId: receiverId },
    });

    return dm;
  }
}
