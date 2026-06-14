import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validación forense con Zod
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const { email, password } = result.data;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 });
    }

    // Hashing robusto de la contraseña
    const passwordHash = await hashPassword(password);

    // Crear usuario en base de datos (por defecto rol INACTIVE)
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    return NextResponse.json(
      { message: 'Usuario creado exitosamente. Proceda a realizar el pago.', userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
