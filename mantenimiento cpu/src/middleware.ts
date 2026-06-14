import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // Rutas que requieren que el usuario esté autenticado y haya pagado (STUDENT)
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/curso')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);
    
    if (!payload) {
      // Token inválido o expirado
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verificación de Control de Acceso Basado en Roles (RBAC)
    if (payload.role !== 'STUDENT' && payload.role !== 'ADMIN') {
      // Si el rol es INACTIVE (no ha pagado)
      return NextResponse.redirect(new URL('/checkout', request.url));
    }

    // El token es válido y tiene permisos. Continuar.
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configurar el matcher para que el middleware no corra en archivos estáticos ni imágenes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
