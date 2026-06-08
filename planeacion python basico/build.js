#!/usr/bin/env node

/**
 * BUILD SYSTEM - CURSO PYTHON BÁSICO
 * Sistema de construcción automatizado para generar la aplicación web optimizada
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');
const config = require('./config.js');

class BuildSystem {
  constructor() {
    this.config = config;
    this.isWatchMode = process.argv.includes('--watch');
    this.startTime = Date.now();
  }

  async build() {
    console.log('🚀 Iniciando construcción del proyecto...\n');
    
    try {
      // Limpiar directorio de build
      await this.cleanBuildDir();
      
      // Crear estructura de directorios
      await this.createDirectoryStructure();
      
      // Procesar componentes
      await this.processComponents();
      
      // Procesar templates
      await this.processTemplates();
      
      // Procesar sesiones
      await this.processSessions();
      
      // Optimizar assets
      await this.optimizeAssets();
      
      // Generar PWA
      await this.generatePWA();
      
      // Copiar archivos estáticos
      await this.copyStaticFiles();
      
      const buildTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
      console.log(`\n✅ Construcción completada en ${buildTime}s`);
      console.log(`📁 Archivos generados en: ${this.config.paths.dist}`);
      
    } catch (error) {
      console.error('❌ Error durante la construcción:', error.message);
      process.exit(1);
    }
  }

  async cleanBuildDir() {
    console.log('🧹 Limpiando directorio de build...');
    await fs.remove(this.config.paths.dist);
    await fs.ensureDir(this.config.paths.dist);
  }

  async createDirectoryStructure() {
    console.log('📁 Creando estructura de directorios...');
    const dirs = [
      'css',
      'js',
      'assets',
      'sessions',
      'components',
      'images'
    ];
    
    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.config.paths.dist, dir));
    }
  }

  async processComponents() {
    console.log('🧩 Procesando componentes...');
    
    // Crear componentes base
    const components = {
      'header.html': this.generateHeader(),
      'navigation.html': this.generateNavigation(),
      'footer.html': this.generateFooter(),
      'session-template.html': this.generateSessionTemplate()
    };

    for (const [filename, content] of Object.entries(components)) {
      const filePath = path.join(this.config.paths.dist, 'components', filename);
      await fs.writeFile(filePath, content, 'utf8');
    }
  }

  async processTemplates() {
    console.log('📄 Procesando templates...');
    
    const templates = {
      'base.html': this.generateBaseTemplate(),
      'session.html': this.generateSessionTemplate()
    };

    for (const [filename, content] of Object.entries(templates)) {
      const filePath = path.join(this.config.paths.dist, 'templates', filename);
      await fs.writeFile(filePath, content, 'utf8');
    }
  }

  async processSessions() {
    console.log('📚 Procesando sesiones...');
    
    // Leer archivos de sesión existentes y optimizarlos
    const sessionsDir = path.join(this.config.paths.src, 'sessions');
    await fs.ensureDir(sessionsDir);
    
    for (let i = 1; i <= this.config.sessions.totalSessions; i++) {
      const sessionFile = path.join(this.config.paths.src, `s${i}.html`);
      if (await fs.pathExists(sessionFile)) {
        await this.optimizeSessionFile(sessionFile, i);
      }
    }
  }

  async optimizeSessionFile(sourceFile, sessionNumber) {
    let content = await fs.readFile(sourceFile, 'utf8');
    
    // Aplicar optimizaciones
    content = this.standardizeLibraries(content);
    content = this.optimizeHTML(content);
    content = this.injectProgressTracking(content, sessionNumber);
    
    const destFile = path.join(this.config.paths.dist, 'sessions', `s${sessionNumber}.html`);
    await fs.writeFile(destFile, content, 'utf8');
  }

  async optimizeAssets() {
    console.log('⚡ Optimizando assets...');
    
    if (this.config.optimization.minifyCSS) {
      await this.minifyCSS();
    }
    
    if (this.config.optimization.minifyJS) {
      await this.minifyJS();
    }
  }

  async minifyCSS() {
    try {
      const cssFiles = await fs.readdir(this.config.paths.css);
      for (const file of cssFiles) {
        if (file.endsWith('.css')) {
          const inputFile = path.join(this.config.paths.css, file);
          const outputFile = path.join(this.config.paths.dist, 'css', file.replace('.css', '.min.css'));
          
          execSync(`npx clean-css-cli ${inputFile} -o ${outputFile}`, { stdio: 'inherit' });
        }
      }
    } catch (error) {
      console.warn('⚠️  Error minificando CSS:', error.message);
    }
  }

  async minifyJS() {
    try {
      const jsFiles = await fs.readdir(this.config.paths.js);
      for (const file of jsFiles) {
        if (file.endsWith('.js')) {
          const inputFile = path.join(this.config.paths.js, file);
          const outputFile = path.join(this.config.paths.dist, 'js', file.replace('.js', '.min.js'));
          
          execSync(`npx uglifyjs ${inputFile} -o ${outputFile}`, { stdio: 'inherit' });
        }
      }
    } catch (error) {
      console.warn('⚠️  Error minificando JS:', error.message);
    }
  }

  async generatePWA() {
    if (!this.config.pwa.enabled) return;
    
    console.log('📱 Generando PWA...');
    
    const manifest = {
      name: this.config.meta.title,
      short_name: "Python Course",
      description: this.config.meta.description,
      start_url: "/",
      display: "standalone",
      background_color: "#2c3e50",
      theme_color: "#3498db",
      icons: [
        {
          src: "/assets/images/icon-192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/assets/images/icon-512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };

    await fs.writeFile(
      path.join(this.config.paths.dist, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    // Generar service worker básico
    const serviceWorker = this.generateServiceWorker();
    await fs.writeFile(
      path.join(this.config.paths.dist, 'sw.js'),
      serviceWorker
    );
  }

  async copyStaticFiles() {
    console.log('📋 Copiando archivos estáticos...');
    
    // Copiar README
    await fs.copy(
      path.join(this.config.paths.src, 'readme.md'),
      path.join(this.config.paths.dist, 'README.md')
    );
    
    // Copiar reportes
    await fs.copy(
      path.join(this.config.paths.src, 'REPORTE_ANALISIS_TECNICO.md'),
      path.join(this.config.paths.dist, 'REPORTE_ANALISIS_TECNICO.md')
    );
  }

  // Métodos de generación de contenido
  generateHeader() {
    return `<!-- HEADER COMPONENT -->
<header class="header session-header">
  <div class="container">
    <a href="index.html" class="back-button">
      <i class="fas fa-arrow-left"></i> Volver al índice
    </a>
    <h1>{{title}}</h1>
    <p>{{subtitle}}</p>
  </div>
</header>`;
  }

  generateNavigation() {
    return `<!-- NAVIGATION COMPONENT -->
<nav class="session-nav">
  <div class="container">
    <ul>
      <li><a href="#objetivo">Objetivo</a></li>
      <li><a href="#conceptos">Conceptos</a></li>
      <li><a href="#actividades">Actividades</a></li>
      <li><a href="#recursos">Recursos</a></li>
    </ul>
  </div>
</nav>`;
  }

  generateFooter() {
    return `<!-- FOOTER COMPONENT -->
<footer class="footer">
  <div class="container">
    <p>&copy; ${new Date().getFullYear()} JGMV-PTEL - Curso Básico de Python. Todos los derechos reservados.</p>
    <div class="social-links">
      <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
    </div>
  </div>
</footer>

<button id="back-to-top" title="Volver arriba">
  <i class="fas fa-arrow-up"></i>
</button>`;
  }

  generateBaseTemplate() {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} - Curso Básico de Python</title>
  
  <!-- Meta tags optimizados -->
  <meta name="description" content="{{description}}">
  <meta name="keywords" content="python, programacion, curso, tutorial">
  <meta name="author" content="JGMV-PTEL">
  
  <!-- Open Graph -->
  <meta property="og:title" content="{{title}}">
  <meta property="og:description" content="{{description}}">
  <meta property="og:image" content="{{ogImage}}">
  <meta property="og:type" content="website">
  
  <!-- PWA -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#3498db">
  
  <!-- Estilos optimizados -->
  <link rel="stylesheet" href="css/styles.min.css">
  <link rel="stylesheet" href="css/session.min.css">
  
  <!-- Librerías externas estandarizadas -->
  <link rel="stylesheet" href="${this.config.externalLibs.fontAwesome}">
  <link rel="stylesheet" href="${this.config.externalLibs.highlightJS}">
</head>
<body>
  {{header}}
  {{navigation}}
  
  <main class="container">
    {{content}}
  </main>
  
  {{footer}}
  
  <!-- Scripts optimizados -->
  <script src="${this.config.externalLibs.highlightJSTheme}"></script>
  <script src="js/main.min.js"></script>
  <script src="js/session.min.js"></script>
  
  <!-- PWA -->
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  </script>
</body>
</html>`;
  }

  generateServiceWorker() {
    return `
// Service Worker - Curso Python Básico
const CACHE_NAME = '${this.config.pwa.cacheName}';
const VERSION = '${this.config.pwa.version}';

const urlsToCache = [
  '/',
  '/css/styles.min.css',
  '/css/session.min.css',
  '/js/main.min.js',
  '/js/session.min.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
`;
  }

  // Métodos de optimización
  standardizeLibraries(content) {
    // Estandarizar Font Awesome
    content = content.replace(
      /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]+/g,
      this.config.externalLibs.fontAwesome
    );
    
    return content;
  }

  optimizeHTML(content) {
    if (this.config.optimization.removeComments) {
      content = content.replace(/<!--[\s\S]*?-->/g, '');
    }
    
    // Minificar HTML básico
    content = content.replace(/>\s+</g, '><');
    content = content.replace(/\s+/g, ' ');
    
    return content;
  }

  injectProgressTracking(content, sessionNumber) {
    const progressHTML = `
    <div class="progress-container">
      <div class="progress-bar progress-${Math.round((sessionNumber / this.config.sessions.totalSessions) * 100)}"></div>
      <span class="progress-text">Sesión ${sessionNumber} de ${this.config.sessions.totalSessions}</span>
    </div>`;
    
    // Insertar después del header
    content = content.replace('</header>', `</header>${progressHTML}`);
    
    return content;
  }

  // Método para modo watch
  startWatchMode() {
    console.log('👀 Iniciando modo watch...');
    
    const watcher = chokidar.watch([
      'css/**/*.css',
      'js/**/*.js',
      's*.html',
      'index.html'
    ], {
      ignored: /node_modules/,
      persistent: true
    });

    watcher.on('change', (path) => {
      console.log(`📝 Archivo modificado: ${path}`);
      this.build();
    });
  }
}

// Ejecutar build
const buildSystem = new BuildSystem();

if (buildSystem.isWatchMode) {
  buildSystem.build().then(() => {
    buildSystem.startWatchMode();
  });
} else {
  buildSystem.build();
}

