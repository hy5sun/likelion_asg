import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.models';
import { NOTFOUND } from 'dns';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const { userId, userPw, userName } = createUserDto;
    if (this.users.find((user)=> user.userId === userId)) {
        throw new ConflictException('User Already Exist');
    }

    const user: User = {
      userId,
      userPw,
      userName,
    };
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(userId: string) {
    const user = this.users.find((user)=> user.userId === userId);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const {userId, userName} = updateUserDto;
    const user = this.users.find((user) => user.userId === userId);

    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
    this.users = this.users.filter((user) => user.userId !== id); // 기존 정보 제거

    user.userId = userId;
    user.userName = userName;
    this.users.push(user);
    console.log('게시글 수정 완료');
  }
}
