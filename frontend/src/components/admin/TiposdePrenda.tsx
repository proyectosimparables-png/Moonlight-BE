
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Shirt } from "lucide-react";

// Datos mock basados en el esquema
const mockTiposPrenda = [
  {
    id: "1",
    nombre: "Camiseta",
    categorias: ["Manga Corta", "Manga Larga", "Tank Top"],
    productoCount: 48,
  },
  {
    id: "2",
    nombre: "Sudadera",
    categorias: ["Con Capucha", "Sin Capucha"],
    productoCount: 35,
  },
  {
    id: "3",
    nombre: "Polo",
    categorias: ["Clásico", "Deportivo"],
    productoCount: 22,
  },
  {
    id: "4",
    nombre: "Chaqueta",
    categorias: ["Ligera", "Acolchada", "Impermeable"],
    productoCount: 18,
  },
  {
    id: "5",
    nombre: "Pantalón",
    categorias: ["Jeans", "Deportivo", "Casual"],
    productoCount: 31,
  },
];

const TiposPrenda = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tipos de Prenda</h1>
          <p className="text-muted-foreground">
            Define los tipos de prendas disponibles
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Tipo
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Categorías Asociadas</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTiposPrenda.map((tipo) => (
              <TableRow key={tipo.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Shirt className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{tipo.nombre}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {tipo.categorias.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>{tipo.productoCount} productos</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TiposPrenda;
