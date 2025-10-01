'use server';
import { revalidatePath } from 'next/cache';

export async function createProducto(formData: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/upload-producto`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Error creando producto');

  revalidatePath('/admin/productos');
  return await res.json();
}


export async function getSecciones() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/secciones`);
  console.log('Fetch secciones response:', res);
  if (!res.ok) throw new Error('Error cargando secciones');
  return res.json();
}

export async function getCategorias(seccionId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/categorias?seccionId=${seccionId}`);
  if (!res.ok) throw new Error('Error cargando categorías');
  return res.json();
}

export async function getTiposPrenda() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/tipo-prenda`);

  if (!res.ok) throw new Error('Error cargando tipos de prenda');
  return res.json();
}

