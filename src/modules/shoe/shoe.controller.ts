import { Body, Controller, Get, Post } from '@nestjs/common';

import { ShoeService } from './shoe.service';

@Controller('shoe')
export class ShoeController {
  constructor(private readonly shoeService: ShoeService) {}

  @Get()
  async list() {
    return this.shoeService.list();
  }

  @Post()
  async create(@Body() body: any) {
    return await this.shoeService.create(body);
  }
}
