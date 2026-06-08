# Mini curso: Git y GitHub (rápido y eficiente)

> Objetivo: aprender a crear repositorios, subir archivos y usar atajos prácticos en GitHub.

## Requisitos
- Git instalado en tu máquina
- Cuenta en GitHub
- Terminal (PowerShell, bash, etc.)

---

## 1. Crear un repositorio en GitHub (web)
1. Entra a GitHub → "New repository".
2. Pon nombre, descripción y **Public** o **Private**.
3. No añadas README ni .gitignore si vas a iniciar localmente.
4. Copia la URL remota (SSH o HTTPS).

---

## 2. Iniciar repositorio local y vincular remoto
```bash
# Ir al directorio del proyecto
cd ruta/a/mi/proyecto

# Inicializar repo Git
git init   # crea .git/ y deja el repo listo

# Añadir archivos al área de staging
git add .  # añade todos los archivos (usa . con precaución)

# Crear el primer commit
git commit -m "Primer commit: estructura inicial"  # guarda snapshot

# Añadir remoto (reemplaza la URL con la tuya)
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Subir rama 'main' al remoto por primera vez
git branch -M main
git push -u origin main   # -u guarda upstream para futuros 'git push'
```

---

## 3. Flujo rápido para hacer cambios y subirlos
```bash
# Hacer cambios en archivos
# Añadir solo archivos modificados (más seguro que git add .)
git add archivo1 archivo2

# Guardar cambios
git commit -m "Descripción breve del cambio"

# Subir al remoto
git push
```

Atajos útiles:
- `git commit -am "msg"` — añade y commitea cambios en archivos ya rastreados (no añade archivos nuevos).
- `git status -s` — vista corta del estado.
- `git log --oneline --graph --decorate -n 10` — historial compacto.

---

## 4. Ramas y trabajo paralelo
```bash
# Crear y cambiar a nueva rama
git checkout -b feature/nombre

# Cuando termines, volver a main y mezclar
git checkout main
git merge feature/nombre

# Subir la rama al remoto (para PR)
git push -u origin feature/nombre
```

Consejo: mantener ramas cortas y claras, usar PR para revisiones.

---

## 5. Rebase y squash (básico)
```bash
# Reescribir últimos 2 commits en una interacción
git rebase -i HEAD~2
```

Usar con cuidado; evita reescribir commits públicos compartidos.

---

## 6. Trucos rápidos en GitHub y web
- Usa el botón "Add file → Upload files" para subir rápido archivos pequeños.
- Arrastra carpetas en la vista de archivos para subir múltiples archivos.
- En la página del repositorio, usa `.` (punto) para abrir el editor web (rápido para cambios menores).
- Usa `Shift`+`T` en la lista de archivos para crear un nuevo archivo rápidamente.

---

## 7. Buenas prácticas
- Mensajes de commit claros y en idioma acordado por tu equipo.
- Añade `.gitignore` para archivos temporales.
- Mantén ramas cortas y PRs revisables.

---

## Recursos
- Documentación oficial: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com/

---

*Fin del mini curso. Usa el archivo `curso-github.html` para una versión interactiva.*
