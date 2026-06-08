/**
 * CONFIGURACIÓN GLOBAL DEL PROYECTO
 * Configuración centralizada para el build system
 */

module.exports = {
  // Configuración de paths
  paths: {
    src: './',
    dist: './build',
    components: './components',
    templates: './templates',
    sessions: './sessions',
    assets: './assets',
    css: './css',
    js: './js'
  },

  // Configuración de librerías externas
  externalLibs: {
    fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    highlightJS: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css',
    highlightJSTheme: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js'
  },

  // Configuración de optimización
  optimization: {
    minifyCSS: true,
    minifyJS: true,
    compressImages: true,
    generateSourceMaps: false,
    removeComments: true
  },

  // Configuración de PWA
  pwa: {
    enabled: true,
    cacheName: 'python-course-v2',
    version: '2.0.0',
    offlinePage: '/offline.html'
  },

  // Configuración de sesiones
  sessions: {
    totalSessions: 32,
    modules: [
      { name: 'Fundamentos', sessions: [1, 2, 3, 4, 5, 6, 7, 8] },
      { name: 'Estructuras de Datos', sessions: [9, 10, 11, 12, 13, 14, 15, 16] },
      { name: 'Funciones y Módulos', sessions: [17, 18, 19, 20, 21, 22, 23, 24] },
      { name: 'Proyecto Final', sessions: [25, 26, 27, 28, 29, 30, 31, 32] }
    ]
  },

  // Configuración de metadatos
  meta: {
    title: 'Curso Básico de Python 🐍',
    description: 'Aprende Python desde cero con nuestro curso completo de 32 sesiones. De principiante a programador en tiempo récord.',
    keywords: 'python, programacion, curso, tutorial, aprender python, programacion basica',
    author: 'JGMV-PTEL',
    ogImage: '/assets/images/python-course-og.jpg'
  }
};

