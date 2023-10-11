import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const GetShoeZ = extendApi(
  z.array(
    z.object({
      name: z.string(),
      merk: z.string(),
      qty: z.number(),
      available: z.boolean(),
      desc: z.string(),
      price: z.number(),
      img: z.string(),
    }),
  ),
);

export const GetShoeQuery = extendApi(
  z.object({
    qty: z.object({
      gt: z.coerce.number(),
    }),
    available: z.enum(['true', 'false']).transform((value) => value === 'true'),
  }),
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
