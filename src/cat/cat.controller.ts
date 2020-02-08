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
  Paramtype,
} from '@nestjs/common';

import { UserModel } from '../model/User';
import { CatService } from './cat.service';
import { HttpExceptionFilter } from '../Exception/http-exception-filter';
import { ValidationPipe } from '../pipe/validation.pipe';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { User } from '../decorator/user.decorator';
import { CreateCat, UpdateCat } from '../cat/model/cat';

@Controller('api/cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter()) // Filter @ controller scope
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('name')
  /* @HttpCode(204)
  @Header('Cache-Control', 'none') */
  //@Redirect('/')
  idName(): string {
    return 'anem of cat';
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.catService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<string> {
    return `This action returns a #${params.id} cat`;
  }

  @Post('create')
  //@Roles('admin') // use to set setMetaData
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)  /** filter @local scope. DInjection will instantiate the class */
  async create(@Body() catObj: CreateCat) {
    return await this.catService.create(catObj);
  }

  /** update method
   * @param {string} id - The id of obj in db
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCat: UpdateCat) {
    return `This action returns a #${id} cat ${updateCat}`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
