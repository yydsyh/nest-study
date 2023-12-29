import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // @Post()
  // create(@Body() createPersonDto: CreatePersonDto) {
  //   return this.personService.create(createPersonDto);
  // }

  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.formUrlEncoded(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: string) {
    return this.personService.query(name, age);
  }

  /**
   * 路由 api/person/:id
   * 路由从上到下匹配
   * @param id
   * @returns
   */
  @Get(':id')
  urlParams(@Param('id') id: string) {
    return this.personService.urlParams(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
