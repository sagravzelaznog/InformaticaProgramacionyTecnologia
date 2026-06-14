import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import Link from 'next/link';
import { BookOpen, CheckCircle, Lock } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const token = cookies().get('auth-token')?.value;
  if (!token) redirect('/login');
  
  const payload = await verifyToken(token);
  if (!payload || payload.role === 'INACTIVE') redirect('/login');

  const course = await prisma.course.findFirst({
    include: {
      lessons: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!course) return <div className="text-white p-8">Curso no encontrado. Ejecuta el Seed.</div>;

  const progress = await prisma.progress.findMany({
    where: { userId: payload.sub },
  });

  const getProgressStatus = (lessonId: string) => {
    return progress.find(p => p.lessonId === lessonId)?.completed;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            {course.title}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400">Estudiante: {payload.email}</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold">
              {payload.email[0].toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Tus Módulos</h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            {course.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.lessons.map((lesson) => {
            const isCompleted = getProgressStatus(lesson.id);
            return (
              <Link href={`/curso/${lesson.id}`} key={lesson.id} className="group">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-800/50 rounded-xl text-blue-400">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full">
                        Módulo {lesson.order}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {lesson.title}
                  </h3>
                  
                  <div className="mt-6 flex items-center text-sm font-medium text-blue-500">
                    Ir a la lección <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ChevronRight no importado arriba, mockeando para evitar error:
const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
