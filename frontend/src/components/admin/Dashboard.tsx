import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

const statsCards = [
  {
    title: "Total Productos",
    value: "248",
    change: "+12% desde el mes pasado",
    icon: Package,
  },
  {
    title: "Órdenes Activas",
    value: "87",
    change: "+8% desde la semana pasada",
    icon: ShoppingCart,
  },
  {
    title: "Usuarios Registrados",
    value: "1,234",
    change: "+23% desde el mes pasado",
    icon: Users,
  },
  {
    title: "Ventas del Mes",
    value: "$45,231",
    change: "+19% desde el mes pasado",
    icon: TrendingUp,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general de tu tienda de ropa
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Orden #{1000 + i}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cliente {i} - Hace {i} horas
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    ${(Math.random() * 500 + 100).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Productos Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Camiseta Custom", "Sudadera Premium", "Polo Bordado", "Gorra Personalizada"].map((product, i) => (
                <div key={product} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gradient-to-br from-primary/20 to-primary/5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {product}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 50 + 10)} vendidos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
