import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const GetShoeSchema = z.array(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string(),
    merk: z.string(),
  }),
);

export class GetShoeDto extends createZodDto(GetShoeSchema) {}

export const CreateShoeSchema = z.object({
  name: z.string(),
  merk: z.string(),
  qty: z.number(),
  available: z.boolean(),
  desc: z.string(),
  price: z.number(),
  img: z.string(),
});

export class CreateShoeDto extends createZodDto(CreateShoeSchema) {}
