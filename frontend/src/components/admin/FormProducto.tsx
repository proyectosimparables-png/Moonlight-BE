'use client';

import { useState, useEffect } from 'react';
import { createProducto } from '@/services/productos';
import {
  getSecciones,
  getCategorias,
  getTiposPrenda,
} from '@/services/productos'; 

export default function FormProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imagenSubidaUrl, setImagenSubidaUrl] = useState<string | null>(null);

  const [seccionIdSeleccionada, setSeccionIdSeleccionada] = useState('');
  const [categoriaIdSeleccionada, setCategoriaIdSeleccionada] = useState('');
  const [tipoPrendaIdSeleccionada, setTipoPrendaIdSeleccionada] = useState('');

  const [secciones, setSecciones] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [tiposPrenda, setTiposPrenda] = useState<any[]>([]);

  // 🔁 Cargar secciones y tipos de prenda al inicio
  useEffect(() => {
    async function cargarIniciales() {
      const [seccionesData, tiposPrendaData] = await Promise.all([
        getSecciones(),
        getTiposPrenda(),
      ]);
      setSecciones(seccionesData);
      setTiposPrenda(tiposPrendaData);
    }
    cargarIniciales();
  }, []);

  // 🔁 Cargar categorías cuando cambia la sección seleccionada
  useEffect(() => {
    if (!seccionIdSeleccionada) {
      setCategorias([]);
      setCategoriaIdSeleccionada('');
      return;
    }

    async function cargarCategorias() {
      const categoriasData = await getCategorias(seccionIdSeleccionada);
      setCategorias(categoriasData);
      setCategoriaIdSeleccionada(''); // Reset
    }
    cargarCategorias();
  }, [seccionIdSeleccionada]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagen(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagen) {
      alert('⚠️ Selecciona una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('file', imagen);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('stock', '10'); // o el valor que necesites
    formData.append('categoriaId', categoriaIdSeleccionada);
    formData.append('tipoPrendaId', tipoPrendaIdSeleccionada);

    try {
      const response = await createProducto(formData);
      alert('✅ Producto creado');
      setImagenSubidaUrl(response.imagenUrl);
    } catch {
      alert('❌ Error al crear producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      {/* Sección */}
      <select
        value={seccionIdSeleccionada}
        onChange={(e) => setSeccionIdSeleccionada(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="">Selecciona una sección</option>
        {secciones.map((sec) => (
          <option key={sec.id} value={sec.id}>
            {sec.nombre}
          </option>
        ))}
      </select>

      {/* Categoría */}
      <select
        value={categoriaIdSeleccionada}
        onChange={(e) => setCategoriaIdSeleccionada(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
        disabled={!seccionIdSeleccionada}
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      {/* Tipo de prenda */}
      <select
        value={tipoPrendaIdSeleccionada}
        onChange={(e) => setTipoPrendaIdSeleccionada(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="">Selecciona un tipo de prenda</option>
        {tiposPrenda.map((tipo) => (
          <option key={tipo.id} value={tipo.id}>
            {tipo.nombre}
          </option>
        ))}
      </select>

      {/* Imagen */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Vista previa:</p>
          <img
            src={previewUrl}
            alt="Vista previa"
            className="w-full max-h-64 object-contain border rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Publicar producto
      </button>

      {imagenSubidaUrl && (
        <div className="mt-6 p-4 border border-green-500 rounded bg-green-50 text-sm text-green-800">
          Imagen subida correctamente:
          <a
            href={imagenSubidaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1 text-blue-600"
          >
            Ver imagen
          </a>
        </div>
      )}
    </form>
  );
}
