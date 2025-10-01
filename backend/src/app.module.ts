import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductoModule } from './producto/producto.module';
import { AuthModule } from './auth/auth.module'; // 👈 importa el módulo nuevo

@Module({
  imports: [
    PrismaModule,
    ProductoModule,
    AuthModule, // 👈 lo registramos acá
  ],
})
export class AppModule {}
