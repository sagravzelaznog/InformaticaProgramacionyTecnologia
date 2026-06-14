import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.create({
    data: {
      title: 'Master Class: Mantenimiento de Windows',
      description: 'Conviértete en un experto en la integridad y reparación del sistema operativo a nivel kernel.',
      price: 49.99,
      published: true,
    },
  });

  console.log(`✅ Curso creado: ${course.title}`);

  for (let i = 1; i <= 10; i++) {
    const fileName = `Guia_Paquete_${i}_Mantenimiento_Windows.txt`;
    const filePath = path.join(process.cwd(), fileName);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      await prisma.lesson.create({
        data: {
          courseId: course.id,
          title: `Módulo ${i}: Mantenimiento de Windows`,
          content: content,
          order: i,
          isFreePreview: i === 1, // Primer módulo gratis como lead magnet
        },
      });
      console.log(`✅ Lección ${i} importada correctamente.`);
    } else {
      console.warn(`⚠️ Archivo no encontrado: ${fileName}`);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Error en el Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
