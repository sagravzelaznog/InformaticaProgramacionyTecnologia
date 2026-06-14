"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Brain, ShieldAlert, Cpu, ChevronDown, Check, Copy } from 'lucide-react';
import { LessonCommand } from '@/utils/lessonParser';

export default function CommandCard({ command, index }: { command: LessonCommand, index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullCommand = command.commandLine.join('\n');
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-lg"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">{command.title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-6 w-6 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 space-y-6">
              
              {command.cognitiveBridge && (
                <div className="flex space-x-3 text-slate-300 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <Brain className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-purple-300 block mb-1">El Puente Cognitivo</strong>
                    <p className="leading-relaxed whitespace-pre-wrap">{command.cognitiveBridge}</p>
                  </div>
                </div>
              )}

              {command.technicalExplanation && (
                <div className="flex space-x-3 text-slate-300">
                  <Cpu className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-cyan-300 block mb-1">Explicación Técnica</strong>
                    <p className="leading-relaxed whitespace-pre-wrap">{command.technicalExplanation}</p>
                  </div>
                </div>
              )}

              {command.practicalGuide && (
                <div className="flex space-x-3 text-slate-300">
                  <ShieldAlert className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-amber-300 block mb-1">Guía Práctica Segura</strong>
                    <p className="leading-relaxed whitespace-pre-wrap">{command.practicalGuide}</p>
                  </div>
                </div>
              )}

              {command.commandLine.length > 0 && (
                <div className="mt-6 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="text-xs flex items-center space-x-1 text-slate-400 hover:text-white transition-colors px-2 py-1 bg-slate-800 rounded-md"
                    >
                      {copied ? <><Check className="h-3 w-3 text-green-400"/> <span>Copiado</span></> : <><Copy className="h-3 w-3"/> <span>Copiar</span></>}
                    </button>
                  </div>
                  <div className="p-4 font-mono text-sm overflow-x-auto text-green-400">
                    {command.commandLine.map((cmd, i) => (
                      <div key={i} className="whitespace-pre">
                        <span className="text-slate-500 select-none">&gt; </span>{cmd}
                      </div>
                    ))}
                  </div>
                  {command.breakdowns.length > 0 && (
                    <div className="bg-slate-900/50 p-4 border-t border-slate-800 text-sm">
                      <ul className="space-y-2">
                        {command.breakdowns.map((b, i) => (
                          <li key={i} className="flex">
                            <span className="text-blue-400 font-mono font-bold w-32 flex-shrink-0">{b.flag}</span>
                            <span className="text-slate-300">{b.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
