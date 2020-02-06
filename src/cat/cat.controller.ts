import {
  Controller,
  Get,
  Post,
  Put,
  Redirect,
  Body,
  Param,
  Delete,
  UseFilters,
  UsePipes,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CreateCat, UpdateCat } from '../model/Cat';
import { UserModel } from '../model/User';
import { ICat } from '../interface';
import { CatService } from './cat.service';
import { HttpExceptionFilter } from '../Exception/http-exception-filter';
import { ValidationPipe } from '../pipe/validation.pipe';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { User } from 'src/decorator/user.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter()) // Filter @ controller scope
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('name')
  /* @HttpCode(204)
  @Header('Cache-Control', 'none') */
  @Redirect('/')
  idName(): string {
    return 'anem of cat';
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    //throw new ForbiddenException();
    return await this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id) {
    return `This action returns a #${id} cat`;
  }

  @Get()
  findUser(@User() user: UserModel) {
    return `This action returns a #${user}`;
  }

  @Post('create')
  @Roles('admin') // use to set setMetaData
  @UsePipes(new ValidationPipe())
  // filter @ local scope. Dependency Injection will instantiate the class
  @UseFilters(HttpExceptionFilter)
  async create(@Body() catObj: CreateCat) {
    await this.catService.create(catObj);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCat: UpdateCat) {
    return `This action returns a #${id} cat ${updateCat}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
