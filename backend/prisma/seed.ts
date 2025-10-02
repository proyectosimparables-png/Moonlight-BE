import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Crear Secciones principales
  const ropa = await prisma.seccion.upsert({
    where: { nombre: 'Ropa' },
    update: {},
    create: { nombre: 'Ropa' },
  });
  console.log(`🧩 Sección creada: ${ropa.nombre}`);

  const ediciones = await prisma.seccion.upsert({
    where: { nombre: 'Ediciones Especiales' },
    update: {},
    create: { nombre: 'Ediciones Especiales' },
  });
  console.log(`🧩 Sección creada: ${ediciones.nombre}`);

  const bazar = await prisma.seccion.upsert({
    where: { nombre: 'Bazar' },
    update: {},
    create: { nombre: 'Bazar' },
  });
  console.log(`🧩 Sección creada: ${bazar.nombre}`);

  // Crear categorías principales
  const remeras = await prisma.categoria.upsert({
    where: { nombre: 'Remeras' },
    update: {},
    create: {
      nombre: 'Remeras',
      seccion: { connect: { id: ropa.id } },
    },
  });
  console.log(`📁 Categoría principal creada: ${remeras.nombre}`);

  const hoodies = await prisma.categoria.upsert({
    where: { nombre: 'Hoodies' },
    update: {},
    create: {
      nombre: 'Hoodies',
      seccion: { connect: { id: ropa.id } },
    },
  });
  console.log(`📁 Categoría principal creada: ${hoodies.nombre}`);

  const buzos = await prisma.categoria.upsert({
    where: { nombre: 'Buzos' },
    update: {},
    create: {
      nombre: 'Buzos',
      seccion: { connect: { id: ropa.id } },
    },
  });
  console.log(`📁 Categoría principal creada: ${buzos.nombre}`);

  const accesorios = await prisma.categoria.upsert({
    where: { nombre: 'Accesorios' },
    update: {},
    create: {
      nombre: 'Accesorios',
      seccion: { connect: { id: ropa.id } },
    },
  });
  console.log(`📁 Categoría principal creada: ${accesorios.nombre}`);

  const limited = await prisma.categoria.upsert({
    where: { nombre: 'Bangtan Limited Edition' },
    update: {},
    create: {
      nombre: 'Bangtan Limited Edition',
      seccion: { connect: { id: ediciones.id } },
    },
  });
  console.log(`📁 Categoría principal creada: ${limited.nombre}`);

  const bags = await prisma.categoria.upsert({
    where: { nombre: 'Bangtan Bags' },
    update: {},
    create: {
      nombre: 'Bangtan Bags',
      seccion: { connect: { id: ediciones.id } },
    },
  });
  console.log(`📁 Categoría principal creada: ${bags.nombre}`);

  const home = await prisma.categoria.upsert({
    where: { nombre: 'Bangtan Home' },
    update: {},
    create: {
      nombre: 'Bangtan Home',
      seccion: { connect: { id: bazar.id } },
    },
  });
  console.log(`📁 Categoría principal creada: ${home.nombre}`);

  // Subcategorías de Remeras
  const remeraBTS = await prisma.categoria.upsert({
    where: { nombre: 'BTS' },
    update: {},
    create: {
      nombre: 'BTS',
      padreId: remeras.id,
    },
  });
  console.log(`  └─ 📂 Subcategoría creada: ${remeraBTS.nombre} (de Remeras)`);

  const otrasSubRemeras = ['Stray Kids', 'The Rose', 'New Jeans'];
  for (const nombre of otrasSubRemeras) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: {
        nombre,
        padreId: remeras.id,
      },
    });
    console.log(`  └─ 📂 Subcategoría creada: ${nombre} (de Remeras)`);
  }

  // Sub-subcategorías de BTS
  const miembrosBTS = [
    'RM',
    'Jin',
    'Suga',
    'J-Hope',
    'Jimin',
    'Taehyung',
    'Jungkook',
    'Rap Line',
    'Vocal Line',
  ];

  for (const nombre of miembrosBTS) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: {
        nombre,
        padreId: remeraBTS.id,
      },
    });
    console.log(`      └─ 🔸 Sub-subcategoría creada: ${nombre} (de BTS)`);
  }

  console.log('\n✅ Seed completado correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando el seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
