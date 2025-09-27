import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [PrismaModule, ProductoModule],
})
export class AppModule {}
