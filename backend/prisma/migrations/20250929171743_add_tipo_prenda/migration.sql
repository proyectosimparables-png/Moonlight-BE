-- AlterTable
ALTER TABLE "public"."Categoria" ADD COLUMN     "tipoPrendaId" TEXT;

-- AlterTable
ALTER TABLE "public"."Producto" ADD COLUMN     "tipoPrendaId" TEXT;

-- CreateTable
CREATE TABLE "public"."TipoPrenda" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoPrenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipoPrenda_nombre_key" ON "public"."TipoPrenda"("nombre");

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_tipoPrendaId_fkey" FOREIGN KEY ("tipoPrendaId") REFERENCES "public"."TipoPrenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Categoria" ADD CONSTRAINT "Categoria_tipoPrendaId_fkey" FOREIGN KEY ("tipoPrendaId") REFERENCES "public"."TipoPrenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
