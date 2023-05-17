import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDmDto } from './dto/create-dm.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DmService {
  constructor(private readonly userService: UserService) {}
  directMessages: CreateDmDto[] = [];

  sendDM(userId: string, createDmDto: CreateDmDto) {
    // 디엠 보내기
    const { receiver, content } = createDmDto;

    if (!userId) {
      // 로그인 안 되어 있으면 예외 처리
      throw new UnauthorizedException('로그인 해주세요.');
    }

    this.userService.findUser(userId); // 해당 유저가 없으면 예외 처리
    this.userService.findUser(receiver);

    const dm: CreateDmDto = {
      receiver,
      content,
      writer: userId,
    };

    this.directMessages.push(dm);
  }

  findAllDM(userId: string) {
    // 디엠 목록 조회
    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요.');
    }
    const dm = this.directMessages.filter((dm) => dm.writer === userId); // 내가 보낸 디엠들로 추리기

    return dm;
  }

  findOneById(userId: string, receiverId: string) {
    // 특정 유저와의 디엠 조회

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요.');
    }

    this.userService.findUser(receiverId); // 유저가 없으면 예외 처리

    const dm = this.directMessages.filter(
      (dm) => dm.writer === userId && dm.receiver === receiverId,
    );

    return dm;
  }
}
