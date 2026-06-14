import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const course = {
      id: 'mantenimiento-cpu',
      title: 'Master Class: Mantenimiento de Windows',
      description: 'Conviértete en un experto en la integridad y reparación del sistema operativo a nivel kernel.',
      price: 49.99,
      published: true,
    };

    const lessons = [];
    const projectRoot = process.cwd(); 
    
    // Tratamos de leer los archivos desde la raíz del proyecto o desde el directorio padre
    const parentRoot = path.join(projectRoot, '..', '..', 'Informatica Programacion y Tecnologia', 'mantenimiento cpu');
    const rootHasFile = fs.existsSync(path.join(projectRoot, 'Guia_Paquete_1_Mantenimiento_Windows.txt'));
    const parentHasFile = fs.existsSync(path.join(parentRoot, 'Guia_Paquete_1_Mantenimiento_Windows.txt'));
    
    const dirToRead = rootHasFile ? projectRoot : parentHasFile ? parentRoot : process.cwd();

    for (let i = 1; i <= 10; i++) {
      const fileName = `Guia_Paquete_${i}_Mantenimiento_Windows.txt`;
      const filePath = path.join(dirToRead, fileName);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        lessons.push({
          id: `modulo-${i}`,
          courseId: 'mantenimiento-cpu',
          title: `Módulo ${i}: Mantenimiento de Windows`,
          content: content,
          order: i,
          isFreePreview: i === 1,
        });
      }
    }

    if (lessons.length === 0) {
       return NextResponse.json({ error: 'No se encontraron los archivos .txt' }, { status: 404 });
    }

    return NextResponse.json({ course, lessons }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
