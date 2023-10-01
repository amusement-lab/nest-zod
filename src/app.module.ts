import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';

import { PrismaModule } from './modules/prisma/prisma.module';
import { ShoeModule } from './modules/shoe/shoe.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ShoeModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
