import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { ShoeService } from './shoe.service';
import { CreateaShoeDto, GetShoeDto, GetShoeZ } from './shoe.dto';

@Controller('shoe')
@UsePipes(ZodValidationPipe)
export class ShoeController {
  constructor(private readonly shoeService: ShoeService) {}

  @Get()
  @ApiCreatedResponse({ type: GetShoeDto })
  async list() {
    return GetShoeZ.parse(await this.shoeService.list());
  }

  @Post()
  @ApiCreatedResponse({ type: CreateaShoeDto })
  async create(@Body() body: CreateaShoeDto) {
    return await this.shoeService.create(body);
  }
}
