# 🚀 INSTRUCCIONES PARA CREAR Y SUBIR A REPOSITORIO DE GITHUB

## Guía Completa para Publicar tu Proyecto de Cálculo Integral

---

## 📋 **REQUISITOS PREVIOS**

### 1. Instalar Git

**Windows:**

- Descargar de: <https://git-scm.com/download/win>
- Ejecutar instalador
- Verificar: Abrir CMD o PowerShell y ejecutar:

```bash
git --version
```

**Mac:**

```bash
# Usando Homebrew
brew install git
```

**Linux:**

```bash
sudo apt-get install git
```

### 2. Crear Cuenta en GitHub

- Ir a: <https://github.com/>
- Click en **"Sign up"**
- Completar registro
- Verificar email

---

## 🔐 **PASO 1: CONFIGURAR GIT (Primera vez)**

Abrir terminal/CMD/PowerShell y ejecutar:

```bash
# Configurar nombre de usuario
git config --global user.name "Tu Nombre"

# Configurar email
git config --global user.email "tu-email@ejemplo.com"

# Verificar configuración
git config --list
```

---

## 🛡️ **PASO 2: CREAR ARCHIVO .gitignore (¡MUY IMPORTANTE!)**

⚠️ **IMPORTANTE:** NO subir archivos sensibles a GitHub.

En la carpeta `calculo/calculo integral/`, crear archivo `.gitignore`:

```gitignore
# ==========================================
# .gitignore para Proyecto Cálculo Integral
# ==========================================

# Archivos de configuración sensibles
# NOTA: firebase.config.js contiene credenciales públicas
# pero es mejor usar variables de entorno en producción

# Node modules (si usas npm)
node_modules/
npm-debug.log
yarn-error.log

# Archivos de entorno
.env
.env.local
.env.development
.env.production
*.env

# Archivos del sistema
.DS_Store
Thumbs.db
desktop.ini

# Carpetas de IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# Archivos temporales
*.tmp
*.temp
*.log

# Archivos de respaldo
*.bak
*.backup
*~

# Archivos de Windows
ehthumbs.db
Desktop.ini

# Carpetas de compilación
dist/
build/
out/

# Archivos de prueba
test-results/
coverage/

# Base de datos local (si la usas)
*.db
*.sqlite
*.sqlite3

# Certificados y claves privadas
*.pem
*.key
*.cert

# Archivos grandes
*.zip
*.rar
*.7z
*.tar.gz
*.iso
```

---

## 📝 **PASO 3: CREAR README.md PARA TU PROYECTO**

Crear archivo `README.md` en la carpeta del proyecto:

```markdown
# 📐 Cálculo Integral - Plataforma Educativa

Plataforma web interactiva para el aprendizaje de Cálculo Integral con sistema de autenticación y seguimiento de progreso.

## 🎯 Características

- ✅ Sistema de autenticación con Firebase
- ✅ 5 módulos de aprendizaje
- ✅ Seguimiento de progreso personalizado
- ✅ Ejercicios interactivos
- ✅ Interfaz moderna y responsiva

## 📚 Módulos del Curso

1. **Módulo 1:** Antiderivadas e Integrales Indefinidas
2. **Módulo 2:** Integral Definida
3. **Módulo 3:** Técnicas de Integración
4. **Módulo 4:** Aplicaciones de la Integral
5. **Módulo 5:** Ecuaciones Diferenciales

## 🚀 Instalación

1. Clonar el repositorio:
   - ```bash
   - git clone https://github.com/TU_USUARIO/calculo-integral.git
   - cd calculo-integral
   - ```

2. Configurar Firebase:
   - Crear proyecto en Firebase Console
   - Copiar credenciales en `firebase.config.js`
   - Activar Authentication (Email/Password)
   - Activar Firestore Database

3. Abrir `login.html` en un servidor local:
   - ```bash
   - # Opción 1: Python
   - python -m http.server 8000
   - # Opción 2: Node.js
   - npx http-server
   - ```

4. Abrir navegador en: `http://localhost:8000`

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- Firebase Authentication
- Firebase Firestore
- MathJax (renderización matemática)

## 📖 Documentación

- [Guía de Firebase](./PASOS_CREAR_FIREBASE.md)
- [Guía de Implementación](./README_FIREBASE.md)
- [Planeación del Curso](./planeacionCI.MD)

## 👨‍🏫 Autor

José Manuel González Vargas - Matemáticas

## 📄 Licencia

Este material es de uso exclusivo para fines educativos.

## 📞 Contacto

Para preguntas o sugerencias, contactar al autor.

---

**© 2025 - Todos los derechos reservados

```bash
---

## 🌐 **PASO 4: CREAR REPOSITORIO EN GITHUB**

### Opción A: Desde GitHub Web

1. **Ir a GitHub:** https://github.com/
2. **Iniciar sesión**
3. **Click en el botón "+"** (esquina superior derecha)
4. **Seleccionar "New repository"**

5. **Configurar repositorio:**
   - **Repository name:** `calculo-integral`
   - **Description:** `Plataforma educativa de Cálculo Integral con Firebase`
   - **Visibilidad:** 
     - ✅ **Public:** Cualquiera puede ver (recomendado para proyectos educativos)
     - ⬜ **Private:** Solo tú y colaboradores
   - **NO marcar:** "Initialize with README" (ya lo crearás localmente)
   - **Add .gitignore:** None (ya lo creaste)
   - **License:** Ninguna o MIT

6. **Click en "Create repository"**

7. **Copiar la URL del repositorio:**
   ```bash
   <https://github.com/TU_USUARIO/calculo-integral.git>
   ```

---

## 💻 **PASO 5: INICIALIZAR GIT LOCALMENTE**

Abrir terminal/CMD/PowerShell en la carpeta de tu proyecto:

```bash
# Navegar a tu carpeta del proyecto
cd "C:\Users\admin\Documents\000 A PREPA\planeaciones especialidades\calculo\calculo integral"

# Inicializar repositorio Git
git init

# Verificar estado
git status
```

---

## 📦 **PASO 6: AGREGAR ARCHIVOS AL REPOSITORIO**

```bash
# Ver qué archivos se agregarán
git status

# Agregar TODOS los archivos (excepto los del .gitignore)
git add .

# O agregar archivos específicos:
git add *.html
git add *.js
git add *.md
git add *.css

# Verificar archivos agregados (en verde)
git status
```

---

## 💾 **PASO 7: HACER EL PRIMER COMMIT**

```bash
# Crear commit con mensaje descriptivo
git commit -m "🎉 Primer commit: Sistema de autenticación y estructura del curso"

# Ver historial de commits
git log
```

---

## 🔗 **PASO 8: CONECTAR CON GITHUB**

```bash
# Agregar repositorio remoto (usa la URL que copiaste en el paso 4)
git remote add origin https://github.com/TU_USUARIO/calculo-integral.git

# Verificar que se agregó correctamente
git remote -v

# Cambiar a rama main (GitHub usa 'main' por defecto)
git branch -M main
```

---

## ⬆️ **PASO 9: SUBIR ARCHIVOS A GITHUB**

```bash
# Subir archivos al repositorio remoto
git push -u origin main

# Se te pedirá autenticación:
# Opción 1: Username + Personal Access Token
# Opción 2: GitHub Desktop
# Opción 3: SSH Key
```

### 🔑 Si te pide autenticación (Personal Access Token)

1. **Ir a GitHub:** <https://github.com/settings/tokens>
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Configurar:**
   - Note: `Git Access for Calculo Integral`
   - Expiration: `90 days` o `No expiration`
   - Scopes: Marcar `repo` (todos los permisos de repo)
4. **Click:** "Generate token"
5. **COPIAR EL TOKEN** (solo se muestra una vez)
6. **Usar como contraseña** cuando Git lo pida

---

## ✅ **PASO 10: VERIFICAR EN GITHUB**

1. **Ir a:** `https://github.com/TU_USUARIO/calculo-integral`
2. **Deberías ver:**
   - ✅ Todos tus archivos
   - ✅ README.md mostrándose
   - ✅ Historial de commits

---

## 🌐 **PASO 11: ACTIVAR GITHUB PAGES (Opcional)**

Para que tu sitio esté disponible en internet:

1. **Ir a tu repositorio en GitHub**
2. **Settings** → **Pages** (menú lateral)
3. **Source:
   - Branch: `main`
   - Folder: `/ (root)` o `/docs`
4. **Click:** "Save"
5. **Esperar 1-2 minutos**
6. **Tu sitio estará en:**

   ```bash
   <https://TU_USUARIO.github.io/calculo-integral/login.html>
   ```

⚠️ **NOTA:** GitHub Pages es público. Asegúrate de que Firebase tenga reglas de seguridad configuradas.

---

## 📝 **COMANDOS GIT PARA USO DIARIO**

### Ver estado del repositorio

```bash
git status
```

### Agregar cambios

```bash
# Agregar todos los archivos modificados
git add .

# Agregar archivo específico
git add archivo.html
```

### Crear commit

```bash
git commit -m "Descripción de cambios"
```

### Subir cambios

```bash
git push
```

### Descargar cambios (si colaboras con otros)

```bash
git pull
```

### Ver historial

```bash
git log

# Historial resumido
git log --oneline
```

### Ver diferencias

```bash
# Ver cambios no guardados
git diff

# Ver cambios de un archivo
git diff archivo.html
```

### Deshacer cambios

```bash
# Deshacer cambios en archivo (antes de commit)
git checkout -- archivo.html

# Deshacer último commit (manteniendo cambios)
git reset --soft HEAD~1

# Deshacer último commit (descartando cambios) ⚠️
git reset --hard HEAD~1
```

---

## 📊 **FLUJO DE TRABAJO COMPLETO**

```bash
# 1. Hacer cambios en archivos
# (editar login.html, auth-manager.js, etc.)

# 2. Ver qué cambió
git status

# 3. Agregar cambios
git add .

# 4. Crear commit
git commit -m "✨ Agregada validación de formularios"

# 5. Subir a GitHub
git push

# 6. Verificar en GitHub web
```

---

## 🎨 **MEJORES PRÁCTICAS PARA COMMITS**

### Mensajes descriptivos

```bash
✅ BIEN:
git commit -m "✨ Agregado sistema de recuperación de contraseña"
git commit -m "🐛 Corregido error en validación de email"
git commit -m "📝 Actualizada documentación de Firebase"

❌ MAL:
git commit -m "cambios"
git commit -m "fix"
git commit -m "update"
```

### Emojis útiles

```bash
✨ :sparkles:      Nueva funcionalidad
🐛 :bug:           Corrección de bug
📝 :memo:          Documentación
🎨 :art:           Mejora de estructura/formato
🔥 :fire:          Eliminar código/archivos
🚀 :rocket:        Mejora de rendimiento
♻️  :recycle:      Refactorización
🔒 :lock:          Seguridad
⚡ :zap:           Performance
💄 :lipstick:      UI/Estilos
```

---

## 🔐 **SEGURIDAD: PROTEGER CREDENCIALES**

### ⚠️ IMPORTANTE sobre firebase.config.js

Las credenciales en `firebase.config.js` son **públicas por diseño de Firebase**, PERO debes configurar:

### 1. Reglas de Seguridad en Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Solo el usuario puede ver/editar sus datos
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2. Configurar dominios autorizados

1. Firebase Console → Authentication → Settings
2. **Authorized domains:** Agregar tu dominio de GitHub Pages

   ```bash
   tu-usuario.github.io
   ```

### 3. Configurar App Check (Avanzado)

- Protege contra uso no autorizado de tu API

---

## 🚨 **SOLUCIÓN DE PROBLEMAS**

### Error: "Permission denied (publickey)"

**Solución 1:** Usar HTTPS en lugar de SSH

```bash
git remote set-url origin https://github.com/TU_USUARIO/calculo-integral.git
```

**Solución 2:** Configurar SSH Key

```bash
# Generar clave SSH
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"

# Copiar clave pública
cat ~/.ssh/id_ed25519.pub

# Agregar en GitHub: Settings → SSH and GPG keys → New SSH key
```

### Error: "fatal: not a git repository"

```bash
# Asegurarte de estar en la carpeta correcta
cd ruta/a/tu/proyecto

# Inicializar Git
git init
```

### Error: "Updates were rejected"

```bash
# Descargar cambios remotos primero
git pull origin main --rebase

# Luego subir
git push
```

### Error: "Large files detected"

Si tienes archivos muy grandes:

```bash
# Instalar Git LFS
git lfs install

# Rastrear archivos grandes
git lfs track "*.pdf"
git lfs track "*.zip"

# Agregar .gitattributes
git add .gitattributes
git commit -m "Configurado Git LFS"
```

---

## 📚 **RECURSOS ADICIONALES**

### Documentación

- **Git:** <https://git-scm.com/doc>
- **GitHub:** <https://docs.github.com/>
- **GitHub Pages:** <https://pages.github.com/>

### Tutoriales

- **Git Básico:** <https://www.atlassian.com/git/tutorials>
- **GitHub Flow:** <https://guides.github.com/introduction/flow/>

### Herramientas

- **GitHub Desktop:** <https://desktop.github.com/> (Interfaz gráfica)
- **GitKraken:** <https://www.gitkraken.com/> (Cliente Git visual)
- **VS Code:** Extensión "GitLens"

---

## ✅ **CHECKLIST FINAL**

Antes de publicar, verificar:

- [ ] Archivo `.gitignore` creado
- [ ] Archivo `README.md` creado
- [ ] No hay credenciales sensibles en el código
- [ ] Firebase tiene reglas de seguridad configuradas
- [ ] Todos los archivos necesarios están incluidos
- [ ] El código funciona localmente
- [ ] Commits tienen mensajes descriptivos
- [ ] Repositorio creado en GitHub
- [ ] Código subido exitosamente
- [ ] README se visualiza correctamente
- [ ] (Opcional) GitHub Pages activado

---

## 🎯 **SIGUIENTES PASOS**

Después de subir a GitHub:

1. ✅ **Compartir proyecto:**

   ```bash
   https://github.com/TU_USUARIO/calculo-integral
   ```

2. ✅ **Hacer backups regulares:**

   ```bash
   git add .
   git commit -m "📝 Actualización del contenido"
   git push
   ```

3. ✅ **Colaborar con otros:**
   - Invitar colaboradores en Settings → Collaborators

4. ✅ **Crear releases:**
   - Tags para versiones importantes
   - Ejemplo: v1.0, v1.1, etc.

5. ✅ **Configurar Actions (CI/CD):**
   - Deploy automático
   - Tests automáticos

---

## 📞 **AYUDA**

Si tienes problemas:

1. **Revisar mensajes de error** en terminal
2. **Buscar en Google:** "git [mensaje de error]"
3. **Stack Overflow:** <https://stackoverflow.com/>
4. **GitHub Community:** <https://github.community/>

---

**Versión:** 1.0  
**Autor:** José Manuel González Vargas  
**Fecha:** Octubre 2025

---

**🎉 ¡Listo para subir tu proyecto a GitHub!**

**Comando resumido:**

```bash
cd "ruta/a/tu/proyecto"
git init
git add .
git commit -m "🎉 Primer commit"
git remote add origin https://github.com/TU_USUARIO/calculo-integral.git
git branch -M main
git push -u origin main
```
