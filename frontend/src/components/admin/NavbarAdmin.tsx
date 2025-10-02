'use client';

import Link from 'next/link';

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Tags,
    Users,
    Shirt,
    FolderTree,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";


const menuItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Publicar", url: "/admin/nuevo-producto", icon: Tags },
    { title: "Productos", url: "/admin/productos", icon: Package },
    { title: "Órdenes", url: "/admin/ordenes", icon: ShoppingCart },
    { title: "Categorías", url: "/admin/categorias", icon: FolderTree },
    { title: "Tipos de Prenda", url: "/admin/tipos-prenda", icon: Shirt },
    { title: "Usuarios", url: "/admin/usuarios", icon: Users },
    {title: "Volver a la tienda", url: "/", icon: ShoppingCart },
];

import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <div className="px-3 py-4">
                    <h1 className={`font-bold transition-all ${isCollapsed ? "text-lg" : "text-xl"}`}>
                        {isCollapsed ? "👕" : "🛍️ Moonlight Admin"}
                    </h1>
                </div>

                <SidebarGroup>
                    <SidebarGroupLabel>Gestión</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={`
                                     flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                                         ${pathname === item.url
                                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                    : 'hover:bg-sidebar-accent/50'}
                                                      `}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );

}