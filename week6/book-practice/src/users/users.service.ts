import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
