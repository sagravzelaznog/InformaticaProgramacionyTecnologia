/**
 * SCRIPT PARA ADAPTAR EL PROYECTO PARA NETLIFY
 * Modifica las páginas para usar el sistema de autenticación sin backend
 */

const fs = require('fs');
const path = require('path');

class NetlifyAdapter {
    constructor() {
        this.projectDir = __dirname;
        this.sessionsDir = __dirname;
        this.adaptedFiles = [];
    }

    /**
     * Adapta todo el proyecto para Netlify
     */
    async adaptForNetlify() {
        console.log('🚀 Iniciando adaptación para Netlify...');
        
        try {
            // 1. Adaptar index.html
            await this.adaptIndexFile();
            
            // 2. Adaptar páginas de sesiones
            await this.adaptSessionPages();
            
            // 3. Crear archivos de configuración
            await this.createNetlifyConfig();
            
            // 4. Crear documentación
            await this.createNetlifyDocs();
            
            console.log('✅ Adaptación para Netlify completada exitosamente');
            console.log(`📊 Archivos adaptados: ${this.adaptedFiles.length}`);
            
        } catch (error) {
            console.error('❌ Error en adaptación:', error);
        }
    }

    /**
     * Adapta el archivo index.html principal
     */
    async adaptIndexFile() {
        try {
            const indexPath = path.join(this.projectDir, 'index.html');
            let content = fs.readFileSync(indexPath, 'utf8');
            
            // Reemplazar auth.js por auth-netlify.js
            content = content.replace('js/auth.js', 'js/auth-netlify.js');
            
            // Agregar meta tags adicionales para Netlify
            const metaTags = `
    <!-- Meta tags adicionales para Netlify -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#667eea">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Curso Python">
    
    <!-- Preload para performance -->
    <link rel="preload" href="css/styles.css" as="style">
    <link rel="preload" href="js/auth-netlify.js" as="script">`;
            
            // Insertar meta tags antes del cierre del head
            content = content.replace('</head>', metaTags + '\n</head>');
            
            // Guardar archivo modificado
            fs.writeFileSync(indexPath, content, 'utf8');
            this.adaptedFiles.push('index.html');
            
            console.log('✅ index.html adaptado para Netlify');
            
        } catch (error) {
            console.error('❌ Error adaptando index.html:', error);
        }
    }

    /**
     * Adapta todas las páginas de sesiones
     */
    async adaptSessionPages() {
        try {
            const sessionFiles = this.findSessionFiles();
            console.log(`📁 Adaptando ${sessionFiles.length} páginas de sesiones`);

            for (const file of sessionFiles) {
                await this.adaptSessionFile(file);
            }

        } catch (error) {
            console.error('❌ Error adaptando páginas de sesiones:', error);
        }
    }

    /**
     * Encuentra todos los archivos de sesiones
     */
    findSessionFiles() {
        const files = fs.readdirSync(this.sessionsDir);
        return files.filter(file => {
            return file.match(/^s\d+\.html$/) && fs.statSync(path.join(this.sessionsDir, file)).isFile();
        });
    }

    /**
     * Adapta una página de sesión individual
     */
    async adaptSessionFile(filePath) {
        try {
            const fullPath = path.join(this.sessionsDir, filePath);
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Verificar si ya está adaptada para Netlify
            if (content.includes('auth-netlify.js')) {
                console.log(`⏭️  ${filePath} ya está adaptada para Netlify`);
                return;
            }

            // Reemplazar auth-guard.js por auth-netlify.js
            content = content.replace('js/auth-guard.js', 'js/auth-netlify.js');
            
            // Agregar meta tags para SEO
            const metaTags = `
    <!-- Meta tags para SEO -->
    <meta name="description" content="Sesión del Curso Básico de Python - Aprende programación desde cero">
    <meta name="robots" content="index, follow">`;
            
            // Insertar meta tags antes del cierre del head
            content = content.replace('</head>', metaTags + '\n</head>');
            
            // Agregar script de manejo de errores
            const errorScript = `
    <!-- Script de manejo de errores para Netlify -->
    <script>
        window.addEventListener('error', function(e) {
            console.error('Error en sesión:', e.error);
        });
    </script>`;
            
            // Insertar script antes del cierre del body
            content = content.replace('</body>', errorScript + '\n</body>');
            
            // Guardar archivo modificado
            fs.writeFileSync(fullPath, content, 'utf8');
            
            this.adaptedFiles.push(filePath);
            console.log(`🔧 ${filePath} adaptada para Netlify`);
            
        } catch (error) {
            console.error(`❌ Error adaptando ${filePath}:`, error);
        }
    }

    /**
     * Crea archivos de configuración para Netlify
     */
    async createNetlifyConfig() {
        try {
            // Crear _redirects como alternativa a netlify.toml
            const redirectsContent = `# Redirects para Netlify
# Redirigir todas las rutas API a index.html
/api/* /index.html 200

# Redirigir todas las demás rutas a index.html para SPA
/* /index.html 200`;

            fs.writeFileSync(path.join(this.projectDir, '_redirects'), redirectsContent, 'utf8');
            this.adaptedFiles.push('_redirects');
            
            // Crear _headers para headers de seguridad
            const headersContent = `# Headers de seguridad para Netlify
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

# Cache para archivos estáticos
/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600`;

            fs.writeFileSync(path.join(this.projectDir, '_headers'), headersContent, 'utf8');
            this.adaptedFiles.push('_headers');
            
            console.log('✅ Archivos de configuración de Netlify creados');
            
        } catch (error) {
            console.error('❌ Error creando configuración de Netlify:', error);
        }
    }

    /**
     * Crea documentación para Netlify
     */
    async createNetlifyDocs() {
        try {
            const docsContent = `# 🚀 Guía de Despliegue en Netlify

## ✅ Adaptación Completada

El proyecto ha sido adaptado exitosamente para Netlify. Los siguientes cambios se realizaron:

### Archivos Modificados
${this.adaptedFiles.map(file => `- ✅ ${file}`).join('\n')}

### Características Adaptadas
- ✅ Sistema de autenticación sin backend
- ✅ Almacenamiento en localStorage
- ✅ Códigos de aprobación manual
- ✅ Panel de administración integrado
- ✅ Notificaciones del navegador
- ✅ Configuración de seguridad

### Funcionalidades Disponibles
- ✅ Login/Logout
- ✅ Registro con códigos de aprobación
- ✅ Protección de páginas
- ✅ Gestión de usuarios
- ✅ Notificaciones

### Funcionalidades No Disponibles
- ❌ Envío automático de correos
- ❌ Aprobación por email
- ❌ Base de datos persistente

## 🚀 Despliegue en Netlify

### Método 1: Drag & Drop
1. Comprimir todos los archivos del proyecto
2. Ir a [netlify.com](https://netlify.com)
3. Arrastrar el archivo ZIP a la zona de deploy
4. Configurar dominio personalizado

### Método 2: Git Integration
1. Conectar repositorio GitHub
2. Configurar build settings:
   - Build command: \`echo "Static site"\`
   - Publish directory: \`.\`
3. Deploy automático

### Método 3: Netlify CLI
\`\`\`bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
\`\`\`

## 🔧 Configuración Post-Despliegue

### Variables de Entorno (Opcional)
En Netlify Dashboard > Site Settings > Environment Variables:
\`\`\`
NODE_VERSION=18
NPM_VERSION=9
\`\`\`

### Dominio Personalizado
1. Ir a Domain Settings
2. Agregar dominio personalizado
3. Configurar DNS

## 📧 Sistema de Aprobación

### Para Administradores
1. Usar usuarios demo: admin/admin123
2. Acceder al panel de administración
3. Aprobar usuarios con códigos

### Para Nuevos Usuarios
1. Registrarse con el formulario
2. Recibir código de aprobación
3. Contactar administrador con el código
4. Esperar aprobación manual

## 🎯 Pruebas Post-Despliegue

### Funcionalidades a Probar
- [ ] Login con usuarios demo
- [ ] Registro de nuevos usuarios
- [ ] Generación de códigos de aprobación
- [ ] Panel de administración
- [ ] Protección de páginas
- [ ] Navegación del curso

### URLs de Prueba
- Página principal: \`https://tu-sitio.netlify.app\`
- Sesión 1: \`https://tu-sitio.netlify.app/s1.html\`
- Panel admin: Usar botón en login

## 🔍 Solución de Problemas

### Problemas Comunes
1. **Páginas no cargan**: Verificar _redirects
2. **CSS no se aplica**: Verificar _headers
3. **JS no funciona**: Verificar consola del navegador
4. **Autenticación falla**: Verificar localStorage

### Logs de Netlify
1. Ir a Deploys en Netlify Dashboard
2. Hacer clic en el deploy más reciente
3. Ver logs de build y deploy

## 📞 Soporte

Para problemas específicos de Netlify:
1. Revisar documentación de Netlify
2. Verificar configuración en dashboard
3. Revisar logs de deploy
4. Contactar soporte de Netlify

---

**Adaptado por**: JGMV-PTEL  
**Fecha**: ${new Date().toISOString().split('T')[0]}  
**Versión**: Netlify Ready
`;

            fs.writeFileSync(path.join(this.projectDir, 'NETLIFY_READY.md'), docsContent, 'utf8');
            this.adaptedFiles.push('NETLIFY_READY.md');
            
            console.log('✅ Documentación de Netlify creada');
            
        } catch (error) {
            console.error('❌ Error creando documentación:', error);
        }
    }

    /**
     * Genera reporte de adaptación
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            adaptedFiles: this.adaptedFiles,
            totalFiles: this.adaptedFiles.length,
            status: 'completed'
        };

        const reportPath = path.join(this.projectDir, 'netlify-adaptation-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
        
        console.log('📋 Reporte de adaptación generado: netlify-adaptation-report.json');
        return report;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const adapter = new NetlifyAdapter();
    adapter.adaptForNetlify()
        .then(() => adapter.generateReport())
        .catch(console.error);
}

module.exports = NetlifyAdapter;

