/**
 * SCRIPT PARA PROTEGER PÁGINAS DE SESIONES
 * Agrega automáticamente la protección de autenticación a todas las sesiones
 */

const fs = require('fs');
const path = require('path');

class SessionProtector {
    constructor() {
        this.sessionsDir = __dirname;
        this.protectedSessions = [];
    }

    /**
     * Protege todas las páginas de sesiones
     */
    async protectAllSessions() {
        console.log('🔒 Iniciando protección de sesiones...');
        
        try {
            // Buscar todas las páginas de sesiones
            const sessionFiles = this.findSessionFiles();
            console.log(`📁 Encontradas ${sessionFiles.length} páginas de sesiones`);

            // Proteger cada sesión
            for (const file of sessionFiles) {
                await this.protectSession(file);
            }

            console.log('✅ Todas las sesiones han sido protegidas exitosamente');
            console.log(`📊 Sesiones protegidas: ${this.protectedSessions.length}`);
            
        } catch (error) {
            console.error('❌ Error protegiendo sesiones:', error);
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
     * Protege una sesión individual
     */
    async protectSession(filePath) {
        try {
            const fullPath = path.join(this.sessionsDir, filePath);
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Verificar si ya está protegida
            if (content.includes('auth-guard.js')) {
                console.log(`⏭️  ${filePath} ya está protegida`);
                return;
            }

            // Agregar protección
            content = this.addProtection(content);
            
            // Guardar archivo modificado
            fs.writeFileSync(fullPath, content, 'utf8');
            
            this.protectedSessions.push(filePath);
            console.log(`🔐 ${filePath} protegida exitosamente`);
            
        } catch (error) {
            console.error(`❌ Error protegiendo ${filePath}:`, error);
        }
    }

    /**
     * Agrega la protección de autenticación al contenido HTML
     */
    addProtection(content) {
        // Buscar el cierre del head
        const headCloseIndex = content.indexOf('</head>');
        if (headCloseIndex === -1) {
            throw new Error('No se encontró el cierre del tag head');
        }

        // CSS para contenido protegido
        const authCSS = `
    <style>
        .protected-content {
            display: none;
        }
        .protected-content.authenticated {
            display: block;
        }
    </style>`;

        // Script de autenticación
        const authScript = `
    <script src="js/auth-guard.js"></script>`;

        // Insertar CSS antes del cierre del head
        content = content.slice(0, headCloseIndex) + authCSS + content.slice(headCloseIndex);

        // Buscar el cierre del body
        const bodyCloseIndex = content.lastIndexOf('</body>');
        if (bodyCloseIndex === -1) {
            throw new Error('No se encontró el cierre del tag body');
        }

        // Insertar script antes del cierre del body
        content = content.slice(0, bodyCloseIndex) + authScript + content.slice(bodyCloseIndex);

        // Agregar clase protected-content al contenido principal
        content = this.addProtectedContentClass(content);

        return content;
    }

    /**
     * Agrega la clase protected-content a los elementos principales
     */
    addProtectedContentClass(content) {
        // Lista de elementos a proteger
        const elementsToProtect = [
            '<main',
            '<article',
            '<section',
            '<header class="session-header"',
            '<div class="session-content"',
            '<div class="content"',
            '<div class="container"'
        ];

        for (const element of elementsToProtect) {
            // Buscar el elemento y agregar la clase
            const regex = new RegExp(`(<${element}[^>]*?)(class="[^"]*")?([^>]*>)`, 'gi');
            content = content.replace(regex, (match, start, existingClass, end) => {
                if (existingClass) {
                    // Si ya tiene clase, agregar protected-content
                    return start + existingClass + ' protected-content' + end;
                } else {
                    // Si no tiene clase, agregar nueva clase
                    return start + ' class="protected-content"' + end;
                }
            });
        }

        return content;
    }

    /**
     * Genera un reporte de protección
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalSessions: this.protectedSessions.length,
            protectedSessions: this.protectedSessions.sort(),
            status: 'completed'
        };

        const reportPath = path.join(this.sessionsDir, 'protection-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
        
        console.log('📋 Reporte de protección generado: protection-report.json');
        return report;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const protector = new SessionProtector();
    protector.protectAllSessions()
        .then(() => protector.generateReport())
        .catch(console.error);
}

module.exports = SessionProtector;
