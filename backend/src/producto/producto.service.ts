import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) {}

  // Crear producto
  async create(data: CreateProductoDto) {
    return this.prisma.producto.create({ data });
  }

  // Listar todos los productos
  async findAll() {
    return this.prisma.producto.findMany();
  }

  // Buscar un producto por ID
  async findOne(id: string) {
    return this.prisma.producto.findUnique({ where: { id } });
  }

  // Actualizar producto
  async update(id: string, data: CreateProductoDto) {
    return this.prisma.producto.update({
      where: { id },
      data,
    });
  }

  // Eliminar producto
  async remove(id: string) {
    return this.prisma.producto.delete({ where: { id } });
  }
}
