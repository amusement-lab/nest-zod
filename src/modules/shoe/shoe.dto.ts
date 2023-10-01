import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const GetShoeZ = extendApi(
  z.array(
    z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      name: z.string(),
      merk: z.string(),
    }),
  ),
);

export class GetShoeDto extends createZodDto(GetShoeZ) {}

export const CreateShoeZ = extendApi(
  z.object({
    name: z.string(),
    merk: z.string(),
    qty: z.number(),
    available: z.boolean(),
    desc: z.string(),
    price: z.number(),
    img: z.string(),
  }),
);

export class CreateaShoeDto extends createZodDto(CreateShoeZ) {}
