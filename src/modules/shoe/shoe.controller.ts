import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiCreatedResponse } from '@nestjs/swagger';
import * as qs from 'qs';

import { ShoeService } from './shoe.service';
import { CreateaShoeDto, GetShoeDto, GetShoeQuery } from './shoe.dto';

@Controller('shoe')
@UsePipes(ZodValidationPipe)
export class ShoeController {
  constructor(private readonly shoeService: ShoeService) {}

  @Get()
  @ApiCreatedResponse({ type: GetShoeDto })
  async list(@Query() query: any, @Req() req: Request) {
    // qs.stringify
    console.log(
      qs.stringify({
        filters: {
          qty: { gt: 40 },
          available: true,
        },
      }),
    );

    // qs.parse
    const { filters } = qs.parse(req.url.split('?')[1]);
    console.log(filters);

    // zod.parse
    console.log(GetShoeQuery.parse(filters));

    return await this.shoeService.list(1, 10, GetShoeQuery.parse(filters));
  }

  @Post()
  @ApiCreatedResponse({ type: CreateaShoeDto })
  async create(@Body() body: CreateaShoeDto) {
    return await this.shoeService.create(body);
  }
}
