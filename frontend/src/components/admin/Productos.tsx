'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

// Datos mock basados en el esquema
const mockProductos = [
  {
    id: "1",
    nombre: "Camiseta Básica Personalizada",
    descripcion: "Camiseta 100% algodón",
    precio: 25.99,
    stock: 150,
    categoria: "Camisetas",
    published: true,
  },
  {
    id: "2",
    nombre: "Sudadera Premium con Logo",
    descripcion: "Sudadera con capucha",
    precio: 45.99,
    stock: 80,
    categoria: "Sudaderas",
    published: true,
  },
  {
    id: "3",
    nombre: "Polo Bordado Empresarial",
    descripcion: "Polo con bordado personalizado",
    precio: 32.50,
    stock: 120,
    categoria: "Polos",
    published: false,
  },
  {
    id: "4",
    nombre: "Gorra Snapback Custom",
    descripcion: "Gorra ajustable con diseño",
    precio: 18.99,
    stock: 200,
    categoria: "Accesorios",
    published: true,
  },
  {
    id: "5",
    nombre: "Chaqueta Deportiva",
    descripcion: "Chaqueta ligera personalizable",
    precio: 65.00,
    stock: 45,
    categoria: "Chaquetas",
    published: true,
  },
];

const Productos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductos = mockProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona el catálogo de tu tienda
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProductos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {producto.descripcion}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{producto.categoria}</TableCell>
                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={producto.stock > 50 ? "default" : "destructive"}>
                    {producto.stock} unidades
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={producto.published ? "default" : "secondary"}>
                    {producto.published ? "Publicado" : "Borrador"}
                  </Badge>
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

export default Productos;