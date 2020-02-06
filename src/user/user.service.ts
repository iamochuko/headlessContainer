import {Injectable, OnModuleInit} from '@nestjs/common'

@Injectable()
export class UserService implements OnModuleInit {
  //constructor(){}

  async onModuleInit(): Promise<void> {
    console.log('this ,odule has been initialized');
  }
}