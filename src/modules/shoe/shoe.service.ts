import { Injectable } from '@nestjs/common';
import { until } from '@open-draft/until';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShoeService {
  constructor(private prisma: PrismaService) {}

  async list() {
    const { error, data } = await until(() => this.prisma.shoe.findMany());

    if (error) {
      throw error;
    }

    return data;
  }

  async create(body: any) {
    const { error, data } = await until(() =>
      this.prisma.shoe.create({ data: body }),
    );

    if (error) {
      throw error;
    }

    return data;
  }
}
