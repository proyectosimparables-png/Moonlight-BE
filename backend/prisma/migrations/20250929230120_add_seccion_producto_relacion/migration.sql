-- AlterTable
ALTER TABLE "public"."Producto" ADD COLUMN     "seccionId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "public"."Seccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
