import Link from 'next/link';
import { ChevronRight, ShieldCheck, Zap, Server } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <header className="relative z-10 border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold tracking-tight">SysAdmin<span className="text-blue-500">Pro</span></span>
          </div>
          <nav>
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Master Class 2026 Ya Disponible</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Domina el <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Mantenimiento CPU</span> <br className="hidden md:block"/> a Nivel Kernel
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Aprende a diagnosticar, reparar y optimizar Windows como un verdadero ingeniero de sistemas. 10 módulos inmersivos con comandos avanzados, scripts forenses y mitigación de BSOD.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/login" 
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative flex items-center justify-center">
                Acceder al Curso <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/50 transition-colors">
              <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integridad del Sistema</h3>
              <p className="text-slate-400 leading-relaxed">
                Repara archivos corruptos del OS (.dll, .sys) utilizando herramientas nativas (SFC, DISM) antes de que el equipo colapse.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/50 transition-colors">
              <div className="h-12 w-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diagnóstico Forense</h3>
              <p className="text-slate-400 leading-relaxed">
                Descubre por qué ocurren los Pantallazos Azules (BSOD) y cómo mitigarlos manipulando los registros de arranque.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/50 transition-colors">
              <div className="h-12 w-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automatización</h3>
              <p className="text-slate-400 leading-relaxed">
                Scripts en PowerShell para reparar volúmenes NTFS y gestionar copias en la sombra (VSS) a velocidad de la luz.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
