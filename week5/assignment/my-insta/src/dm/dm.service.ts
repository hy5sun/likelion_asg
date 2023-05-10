import { Injectable } from '@nestjs/common';
import { CreateDmDto } from './dto/create-dm.dto';

@Injectable()
export class DmService {
  directMessages: CreateDmDto[] = [];

  sendDM(createDmDto: CreateDmDto) { // 디엠 보내기
    const {receiver, content} = createDmDto;

    const dm: CreateDmDto = {
      receiver,
      content
    };

    this.directMessages.push(dm);
  }

  findAllDM() { // 디엠 목록 조회
    return this.directMessages;
  }

  findOneById(nickname: string) { // 특정 유저와의 디엠 조회
    const dm = this.directMessages.find((dm) => nickname === dm.receiver);
    
    return dm;
  }
}
