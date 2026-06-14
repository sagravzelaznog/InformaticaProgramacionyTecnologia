"use client";

import { use, useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { parseLessonText, ParsedLesson } from '@/utils/lessonParser';
import CommandCard from '@/components/CommandCard';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import KahootQuiz from '@/components/KahootQuiz';
import { quizzes } from '@/data/quizzes';

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const unwrappedParams = use(params);
  const lessonId = unwrappedParams.lessonId;
  const [lesson, setLesson] = useState<any>(null);
  const [parsed, setParsed] = useState<ParsedLesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
        if (lessonDoc.exists()) {
          const data = lessonDoc.data();
          setLesson(data);
          
          if (data.content) {
            const parsedData = parseLessonText(data.content);
            setParsed(parsedData);
          }
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors">
               &larr; Volver al Dashboard
            </Link>
            <span className="text-sm text-slate-400 font-semibold uppercase tracking-wider">Master Class Interactiva</span>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-20 text-slate-400">
              <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 rounded-full mx-auto mb-4"></div>
              Cargando interfaz interactiva...
            </div>
          ) : !lesson || !parsed ? (
            <div className="text-center py-20 text-red-400">Lección no encontrada o formato inválido.</div>
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 relative"
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>
                <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">
                  Módulo {lesson.order}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
                  {parsed.moduleTitle ? parsed.moduleTitle.replace('MÓDULO 1: ', '') : lesson.title}
                </h1>
                <p className="text-slate-400 text-lg mb-8 font-medium">
                  {parsed.author ? `Impartido por: ${parsed.author}` : ''}
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              </motion.div>

              {parsed.intro && (
                <motion.section 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="mb-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="bg-blue-500/20 text-blue-400 p-2 rounded-xl mr-3">🧠</span>
                    Introducción Andragógica
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {parsed.intro}
                  </div>
                </motion.section>
              )}

              <section className="mb-16">
                <h2 className="text-3xl font-extrabold text-white mb-8">Caja de Herramientas (Comandos)</h2>
                {parsed.commands.map((cmd, index) => (
                  <CommandCard key={cmd.id} command={cmd} index={index} />
                ))}
              </section>

              {(parsed.challengeTitle || parsed.challengeContent) && (
                <motion.section 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-900/50 to-purple-900/30 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 bg-indigo-500/20 rounded-2xl">
                      <Trophy className="h-8 w-8 text-indigo-300" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight whitespace-pre-wrap">
                      {parsed.challengeTitle || "El Desafío Andragógico"}
                    </h2>
                  </div>
                  <div className="prose prose-invert prose-lg max-w-none text-indigo-100/80 leading-relaxed whitespace-pre-wrap">
                    {parsed.challengeContent}
                  </div>
                </motion.section>
              )}

              {/* Kahoot Quiz Section */}
              {quizzes[lessonId] && quizzes[lessonId].length > 0 && (
                <KahootQuiz questions={quizzes[lessonId]} />
              )}

            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
