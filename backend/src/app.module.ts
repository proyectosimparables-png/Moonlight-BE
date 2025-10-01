import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductoModule } from './producto/producto.module';
import { AuthModule } from './auth/auth.module'; // ✅ de tu rama
import { AdminModule } from './admin/admin.module'; // ✅ de la rama maca
import { CloudinaryModule } from './claudinary/cloudinary.module'; // ✅ de la rama maca

@Module({
  imports: [
    PrismaModule,
    ProductoModule,
    AuthModule,
    AdminModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
