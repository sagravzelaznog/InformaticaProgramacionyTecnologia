"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, setDoc } from 'firebase/firestore';

export default function DashboardPage() {
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', 'mantenimiento-cpu'));
        if (courseDoc.exists()) {
          setCourse(courseDoc.data());
        }

        const lessonsQuery = query(collection(db, 'lessons'), orderBy('order', 'asc'));
        const lessonsSnap = await getDocs(lessonsQuery);
        const fetchedLessons = lessonsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        setLessons(fetchedLessons);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white font-sans">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              {course ? course.title : 'Cargando curso...'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">Estudiante: {auth.currentUser?.email}</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold">
                {auth.currentUser?.email?.[0]?.toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-slate-400 text-center py-12">Cargando módulos...</div>
          ) : lessons.length === 0 ? (
            <div className="text-slate-400 text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="mb-4">No hay lecciones en la base de datos.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Tus Módulos</h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                  {course?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <Link href={`/curso/${lesson.id}`} key={lesson.id} className="group">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-800/50 rounded-xl text-blue-400">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full">
                          Módulo {lesson.order}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h3>
                      
                      <div className="mt-6 flex items-center text-sm font-medium text-blue-500">
                        Ir a la lección <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
