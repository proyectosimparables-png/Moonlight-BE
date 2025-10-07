/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Seccion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `TipoPrenda` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "public"."Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Seccion_nombre_key" ON "public"."Seccion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TipoPrenda_nombre_key" ON "public"."TipoPrenda"("nombre");
