import { Injectable, OnModuleInit, HttpException } from '@nestjs/common';

export interface IUser {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UserService implements OnModuleInit {
  private readonly users: IUser[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
      },
      {
        userId: 3,
        username: 'john',
        password: 'changeme',
      },
    ];
  }

  async findOne(username: string): Promise<IUser | undefined> {
    try {
      const u = this.users.find(u => (u.username = username));
      return u ? u : null;
    } catch (err) {
      throw new HttpException('Bad response', 302);
    }
  }

  async onModuleInit(): Promise<void> {
    console.log('[userService] - module initialized');
  }
}
