
# Curso: Git para Profesionales

Bienvenido al curso de Git basado en el manual "Git Notes for Professionals". Este curso está diseñado en 10 sesiones que te llevarán desde la configuración inicial hasta el dominio de flujos de trabajo avanzados y resolución de problemas.

## Objetivos del Curso

Al finalizar este curso, el estudiante será capaz de gestionar repositorios locales y remotos, deshacer errores, reescribir el historial de manera segura y aplicar flujos de trabajo profesionales en equipo.

---

## Planeación de las 10 Sesiones

### Sesión 1: Introducción a Git y Configuración Inicial

* **Inicialización y Clonación:** Cómo usar `git init` para crear repositorios y `git clone` para copiar repositorios existentes (incluyendo clonación profunda y superficial).
* **Configuración de Usuario:** Establecer tu nombre y correo electrónico global o por repositorio usando `git config`.
* **Alias Básicos y Avanzados:** Configurar atajos para comandos comunes y mejorar la productividad.

### Sesión 2: El Área de Preparación (Staging) y Commits

* **Staging:** Añadir archivos al área de preparación usando `git add -A` y el modo interactivo `git add -p` para revisar fragmentos (hunks).
* **Commits:** Crear commits significativos, convenciones para buenos mensajes de commit, y el uso del flag `-m` y `-a`.
* **Modificar Commits:** Uso de `git commit --amend` para corregir mensajes o agregar archivos al último commit sin crear uno nuevo.

### Sesión 3: Exploración del Historial y Diferencias (Diff)

* **Navegación del Historial:** Uso de `git log`, formateos personalizados (`--oneline`, `--graph`), y búsqueda de cadenas específicas en el historial.
* **Resumen de Contribuciones:** Generar estadísticas y agrupar contribuciones usando `git shortlog`.
* **Diferencias:** Usar `git diff` para ver cambios en el directorio de trabajo, en el área de preparación (`--staged`), y comparar entre ramas.

### Sesión 4: Ignorar y Limpiar Archivos

* **Ignorar Archivos:** Creación y uso del archivo `.gitignore`, reglas para subdirectorios y cómo usar un `.gitignore` global.
* **Ignorar Archivos Rastreables:** Uso de `git update-index --assume-unchanged` para ignorar temporalmente cambios en archivos rastreados.
* **Limpieza del Repositorio:** Eliminar archivos y directorios no rastreados con `git clean -f` y `-d`, y previsualización con `--dry-run` (`-n`).

### Sesión 5: Ramas (Branching) y Fusiones (Merging)

* **Gestión de Ramas:** Crear, listar (`git branch -a`) y cambiar de ramas con `git checkout` y `git checkout -b`.
* **Mover y Borrar Ramas:** Renombrar ramas locales (`-m`) y eliminación segura (`-d`) o forzada (`-D`).
* **Fusiones (Merging):** Unir ramas con `git merge`, entender el "fast-forward" frente a `--no-ff`, y resolución manual de conflictos de fusión.

### Sesión 6: Trabajo con Remotos, Push y Pull

* **Gestión de Remotos:** Añadir (`git remote add`), listar (`-v`) y cambiar URLs (`set-url`) de repositorios remotos.
* **Sincronización (Pull y Fetch):** Descargar cambios usando `git fetch` y unirlos con `git pull` (y cómo hacerlo con `--rebase`).
* **Envío de Código (Push):** Enviar ramas locales al remoto, forzar la subida de cambios y eliminar ramas remotas con `git push`.

### Sesión 7: Deshacer Cambios y Recuperación

* **Deshacer Cambios:** Retornar a estados anteriores con `git reset --soft` y `--hard`, y restaurar archivos del directorio de trabajo con `git checkout -- <file>`.
* **Revertir:** Uso de `git revert` para crear un commit que deshaga un commit anterior de forma segura y pública.
* **El Salvavidas (Reflog):** Cómo usar `git reflog` para encontrar y recuperar commits perdidos o deshacer un rebase mal ejecutado.

### Sesión 8: Rebase y Squashing

* **Rebase Local:** Reaplicar commits encima de otra rama (`git rebase master`) para mantener un historial lineal.
* **Rebase Interactivo:** Usar `git rebase -i` para reordenar, editar o combinar commits del historial.
* **Squashing:** Combinar múltiples commits en uno solo durante el merge (`--squash`) o con un rebase interactivo para limpiar el historial.

### Sesión 9: Trabajo Paralelo y Tareas Específicas (Stash y Cherry Pick)

* **Guardado Temporal (Stashing):** Usar `git stash` para guardar cambios incompletos, listar guardados, y restaurarlos con `git stash pop` o `apply`.
* **Stash Interactivo:** Guardar solo archivos rastreados específicos o mantener el index (`--keep-index`).
* **Cherry Picking:** Seleccionar y copiar un commit específico (`git cherry-pick <hash>`) de una rama a otra.

### Sesión 10: Flujos de Trabajo en Git (Workflows)

* **Flujo Centralizado:** Todo el desarrollo en la rama `master`.
* **Gitflow:** Uso de ramas estructuradas (`master`, `develop`, `feature`, `release`, `hotfix`) para ciclos de desarrollo formales.
* **Feature Branch y GitHub Flow:** Desarrollo aislado por funcionalidades y el uso de "Pull Requests" para revisión de código antes de enviar a producción.
* **Forking Workflow:** Flujo ideal para código abierto donde cada desarrollador tiene su propio repositorio clonado.
