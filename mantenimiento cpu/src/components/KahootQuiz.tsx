"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Triangle, Hexagon, Circle, Square, CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '@/data/quizzes';

interface KahootQuizProps {
  questions: QuizQuestion[];
}

const SHAPE_ICONS = [Triangle, Hexagon, Circle, Square];
const BG_COLORS = [
  'bg-red-600 hover:bg-red-500',
  'bg-blue-600 hover:bg-blue-500',
  'bg-amber-500 hover:bg-amber-400',
  'bg-emerald-600 hover:bg-emerald-500'
];
const SHADOW_COLORS = [
  'shadow-red-600/50',
  'shadow-blue-600/50',
  'shadow-amber-500/50',
  'shadow-emerald-600/50'
];

export default function KahootQuiz({ questions }: KahootQuizProps) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (isChecked) return;
    setSelectedAnswer(index);
    setIsChecked(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 1000); // 1000 points per correct answer (Kahoot style)
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedAnswer(null);
        setIsChecked(false);
      } else {
        setCompleted(true);
      }
    }, 2500); // Wait 2.5 seconds before moving to next question
  };

  const restartQuiz = () => {
    setStarted(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsChecked(false);
    setCompleted(false);
  };

  if (!started) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden mt-16 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
        <h2 className="text-3xl font-extrabold text-white mb-4">¿Listo para el Reto? 🎮</h2>
        <p className="text-slate-400 mb-8">
          Demuestra lo que aprendiste en este módulo con un desafío rápido de 7 preguntas.
        </p>
        <button 
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(147,51,234,0.3)]"
        >
          Iniciar Quiz
        </button>
      </div>
    );
  }

  if (completed) {
    const percentage = score / (questions.length * 1000);
    const passed = percentage >= 0.7;

    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-2xl mt-16 mb-8"
      >
        <Trophy className={`w-24 h-24 mx-auto mb-6 ${passed ? 'text-yellow-400' : 'text-slate-500'}`} />
        <h2 className="text-4xl font-extrabold text-white mb-2">
          {passed ? '¡Excelente Trabajo!' : 'Sigue Practicando'}
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Obtuviste <strong className="text-white text-2xl">{score}</strong> puntos
        </p>
        <button 
          onClick={restartQuiz}
          className="flex items-center justify-center mx-auto px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5 mr-2" /> Reintentar
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 mb-16 relative">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
        {/* Header (Progress and Score) */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div className="text-slate-400 font-bold">
            Pregunta {currentIndex + 1} de {questions.length}
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-xl text-white font-bold flex items-center">
            Puntos: {score}
          </div>
        </div>

        {/* Question */}
        <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12 leading-tight">
          {currentQuestion.question}
        </h3>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {currentQuestion.options.map((option, idx) => {
              const Icon = SHAPE_ICONS[idx];
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              
              // Define style logic based on whether user has checked an answer
              let buttonStateClass = BG_COLORS[idx];
              if (isChecked) {
                if (isCorrect) {
                  buttonStateClass = "bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]";
                } else if (isSelected && !isCorrect) {
                  buttonStateClass = "bg-red-500 opacity-80";
                } else {
                  buttonStateClass = "bg-slate-800 opacity-50 grayscale";
                }
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isChecked}
                  className={`relative flex items-center p-6 rounded-2xl text-left transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 ${buttonStateClass} ${!isChecked && SHADOW_COLORS[idx]}`}
                >
                  <div className="bg-white/20 p-3 rounded-xl mr-4 flex-shrink-0">
                    <Icon className="w-8 h-8 text-white fill-white" />
                  </div>
                  <span className="text-white font-bold text-lg md:text-xl leading-tight">
                    {option}
                  </span>
                  
                  {/* Result Icon */}
                  {isChecked && isSelected && isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                  {isChecked && isSelected && !isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4">
                      <XCircle className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
