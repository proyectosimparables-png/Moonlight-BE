import { IsString, IsOptional } from 'class-validator';

export class PublicarProductoDto {
  @IsString()
  tipoPrendaId: string;

  @IsOptional()
  @IsString()
  categoriaId?: string;

  @IsOptional()
  @IsString()
  seccionId?: string;
}
