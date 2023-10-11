import { Injectable } from '@nestjs/common';
import { until } from '@open-draft/until';

import { PrismaService } from '../prisma/prisma.service';
import { paginate } from '~~/helpers/paginate';

@Injectable()
export class ShoeService {
  constructor(private prisma: PrismaService) {}

  async list(page: number, limit: number, where: any, orderBy: any) {
    const { error, data } = await until(() =>
      paginate({
        request: { where, page, limit, orderBy },
        count: (where) => this.prisma.shoe.count({ where }),
        data: ({ where, orderBy, take, skip }) =>
          this.prisma.shoe.findMany({ where, orderBy, take, skip }),
      }),
    );

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
