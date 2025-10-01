import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import type { Express } from 'express';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // ✅ Crear producto
  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.productoService.create(dto);
  }

  // ✅ Obtener todos los productos
  @Get()
  findAll(
    @Query('published') published?: string,
    @Query('seccionId') seccionId?: string,
    @Query('categoriaId') categoriaId?: string,
    @Query('tipoPrendaId') tipoPrendaId?: string,
  ) {
    const isPublished =
      published === 'true' ? true : published === 'false' ? false : undefined;

    return this.productoService.findAll(
      isPublished,
      seccionId,
      categoriaId,
      tipoPrendaId,
    );
  }

  // ✅ Subir producto con imagen a Cloudinary
  @Post('upload-producto')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async uploadProducto(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductoDto,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    const streamUpload = () =>
      new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'productos' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        Readable.from(file.buffer).pipe(stream);
      });

    const uploadResult = await streamUpload();

    return this.productoService.create({
      ...body,
      seccionId: body.seccionId ? String(body.seccionId) : undefined,
      categoriaId: String(body.categoriaId),
      tipoPrendaId: String(body.tipoPrendaId),
      imagenUrl: uploadResult.secure_url,
    });
  }

  // ✅ Obtener secciones
  @Get('secciones')
  getSecciones() {
    console.log('GET /productos/secciones llamado');
    return this.productoService.getSecciones();
  }

  // ✅ Obtener categorías por sección
  @Get('categorias')
  getCategorias(@Query('seccionId') seccionId: string) {
    return this.productoService.getCategoriasBySeccion(seccionId);
  }

  // ✅ Obtener tipos de prenda
  @Get('tipo-prenda')
  getTiposPrenda() {
    return this.productoService.getTiposPrenda();
  }

  // ✅ Actualizar producto
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateProductoDto) {
    return this.productoService.update(id, dto);
  }

  // ✅ Eliminar producto
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(id);
  }

  // ✅ Publicar producto
  @Put(':id/publicar')
  publicar(@Param('id') id: string) {
    return this.productoService.publicar(id);
  }

  // ✅ Obtener producto por ID (debe ir AL FINAL)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(id);
  }
}
