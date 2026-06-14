import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const token = cookies().get('auth-token')?.value;
  if (!token) redirect('/login');
  
  const payload = await verifyToken(token);
  if (!payload || payload.role === 'INACTIVE') redirect('/login');

  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { course: true },
  });

  if (!lesson) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors">
             &larr; Volver al Dashboard
          </Link>
          <span className="text-sm text-slate-400 font-semibold uppercase tracking-wider">{lesson.course.title}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">
            Módulo {lesson.order}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-8 leading-tight">
            {lesson.title}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-a:text-blue-400">
          {/* Aquí renderizamos el contenido del .txt importado de forma segura */}
          <pre className="whitespace-pre-wrap font-sans bg-transparent border-0 p-0 m-0 text-slate-300 leading-relaxed">
            {lesson.content}
          </pre>
        </article>
      </main>
    </div>
  );
}
