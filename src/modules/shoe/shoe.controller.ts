import { Body, Controller, Get, Post } from '@nestjs/common';

import { ShoeService } from './shoe.service';
import { GetShoeSchema, CreateShoeDto, CreateShoeSchema } from './shoe.dto';

@Controller('shoe')
export class ShoeController {
  constructor(private readonly shoeService: ShoeService) {}

  @Get()
  async list() {
    return GetShoeSchema.parse(await this.shoeService.list());
  }

  @Post()
  async create(@Body() body: CreateShoeDto) {
    return CreateShoeSchema.parse(await this.shoeService.create(body));
  }
}
