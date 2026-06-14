import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validación de entrada
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const { email, password } = result.data;

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Verificar hash
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Generar JWT Edge-Compatible
    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // Seteo de Cookie segura
    const response = NextResponse.json({ message: 'Login exitoso', role: user.role }, { status: 200 });
    
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true, // Mitigación XSS: JS en cliente no puede leerla
      secure: process.env.NODE_ENV === 'production', // Solo viaja por HTTPS
      sameSite: 'strict', // Mitigación CSRF
      path: '/',
      maxAge: 60 * 60 * 24, // 24 horas
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
