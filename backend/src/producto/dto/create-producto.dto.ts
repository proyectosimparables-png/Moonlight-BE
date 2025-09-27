import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsUrl()
  imagenUrl?: string;
}
