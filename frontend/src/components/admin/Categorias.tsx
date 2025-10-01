import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, FolderTree } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Datos mock basados en el esquema con jerarquía
const mockCategorias = [
  {
    id: "1",
    nombre: "Camisetas",
    subcategorias: ["Manga Corta", "Manga Larga", "Tank Tops"],
    productoCount: 45,
    seccion: "Ropa Superior",
  },
  {
    id: "2",
    nombre: "Sudaderas",
    subcategorias: ["Con Capucha", "Sin Capucha", "Crop"],
    productoCount: 32,
    seccion: "Ropa Superior",
  },
  {
    id: "3",
    nombre: "Pantalones",
    subcategorias: ["Jeans", "Deportivos", "Casuales"],
    productoCount: 28,
    seccion: "Ropa Inferior",
  },
  {
    id: "4",
    nombre: "Accesorios",
    subcategorias: ["Gorras", "Bolsos", "Cinturones"],
    productoCount: 56,
    seccion: "Complementos",
  },
];

const Categorias = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
          <p className="text-muted-foreground">
            Organiza tus productos por categorías
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockCategorias.map((categoria) => (
          <Card key={categoria.id} className="group hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <FolderTree className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{categoria.nombre}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {categoria.seccion}
                    </p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Productos</span>
                  <Badge variant="secondary">{categoria.productoCount}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Subcategorías:</p>
                  <div className="flex flex-wrap gap-1">
                    {categoria.subcategorias.map((sub) => (
                      <Badge key={sub} variant="outline" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
