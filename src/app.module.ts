import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './modules/prisma/prisma.module';
import { ShoeModule } from './modules/shoe/shoe.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ShoeModule],
})
export class AppModule {}
