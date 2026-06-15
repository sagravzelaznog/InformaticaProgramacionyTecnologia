"use client";

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const [completedCount, setCompletedCount] = useState(0);
  const totalModules = 10;

  useEffect(() => {
    // Wait for auth to be ready
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // Listen to user progress
        const docRef = doc(db, 'user_progress', user.uid);
        const unsubscribeDoc = onSnapshot(docRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (data.completedModules && Array.isArray(data.completedModules)) {
              setCompletedCount(data.completedModules.length);
            }
          }
        });
        
        return () => unsubscribeDoc();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const percentage = Math.min(100, Math.max(0, (completedCount / totalModules) * 100));

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between text-xs font-bold text-slate-400">
        <span>Progreso del Curso</span>
        <span>{percentage.toFixed(0)}% ({completedCount}/{totalModules} Módulos)</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
