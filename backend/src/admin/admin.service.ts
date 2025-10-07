import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductoAdminDto } from './dto/create-producto-admin.dto';
import { PublicarProductoDto } from './dto/publicar-producto.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener tipos de prenda
  getTiposPrenda() {
    return this.prisma.tipoPrenda.findMany({
      include: { categorias: true },
    });
  }

  // Obtener secciones
  getSecciones() {
    return this.prisma.seccion.findMany();
  }

  // Crear producto en estado "borrador"
  createProducto(dto: CreateProductoAdminDto) {
    return this.prisma.producto.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        precio: dto.precio,
        stock: dto.stock,
        imagenUrl: dto.imagenUrl,
        tipoPrendaId: dto.tipoPrendaId,
        categoriaId: dto.categoriaId,
      },
    });
  }

  // Publicar producto: asignar tipo, categoría y seccion
  publicarProducto(id: string, dto: PublicarProductoDto) {
    return this.prisma.producto.update({
      where: { id },
      data: {
        tipoPrendaId: dto.tipoPrendaId,
        categoriaId: dto.categoriaId,
        seccionId: dto.seccionId,
      },
    });
  }
}
