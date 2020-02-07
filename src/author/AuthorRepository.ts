import { EntityRepository, Repository } from 'typeorm';

import { PhotoEntity } from 'src/photo/photo.entity';

// custom repository : this extends and adds extra feature

@EntityRepository(PhotoEntity)
export class AuthorRepository extends Repository<PhotoEntity> {}
