import { Injectable } from '@nestjs/common';

import { AuthorRepository } from './AuthorRepository';

@Injectable()
export class AuthorService {
  constructor(private readonly authRepository: AuthorRepository) {}
}
