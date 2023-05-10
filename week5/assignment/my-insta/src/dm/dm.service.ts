import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateDmDto } from './dto/create-dm.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DmService {
  constructor(private readonly userService: UserService) {}
  directMessages: CreateDmDto[] = [];

  sendDM(userId: string, createDmDto: CreateDmDto) { // 디엠 보내기
    const {receiver, content} = createDmDto;

    if (!userId) { // 로그인 안 되어 있으면 예외 처리
      throw new UnauthorizedException('로그인 해주세요.');
    }
    
    this.userService.findUser(userId); // 해당 유저가 없으면 예외 처리

    const dm: CreateDmDto = {
      receiver,
      content
    };

    this.directMessages.push(dm);
  }

  findAllDM() { // 디엠 목록 조회
    return this.directMessages;
  }

  findOneById(userId: string) { // 특정 유저와의 디엠 조회
    const dm = this.directMessages.find((dm) => userId === dm.receiver);

    if (!dm) {
      throw new NotFoundException(`${userId}와의 메시지 내역이 없습니다.`);
    }

    if (!userId) {
      throw new UnauthorizedException('로그인 해주세요.');
    }

    return dm;
  }
}
