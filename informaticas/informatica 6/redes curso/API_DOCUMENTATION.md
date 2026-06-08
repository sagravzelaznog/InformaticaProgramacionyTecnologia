# Documentación de API Web - Curso de Redes de Computadoras

## Resumen Ejecutivo

El proyecto "Informática Redes" es una aplicación web educativa diseñada para impartir un curso completo de redes de computadoras dirigido a técnicos de preparatoria. La aplicación está construida como una plataforma web estática que proporciona contenido estructurado, interactividad mediante JavaScript y una experiencia de usuario moderna mediante CSS.

## Arquitectura del Sistema

### Patrón Arquitectónico

- **Tipo**: Aplicación Web Estática (SPA-like)
- **Arquitectura**: Frontend-only con separación de responsabilidades
- **Patrón**: MVC simplificado en el frontend

### Componentes Principales

```text
informatica-redes/
├── index.html          # Página principal con índice del curso
├── styles.css          # Sistema de estilos centralizado
├── scripts.js          # Lógica de aplicación JavaScript
├── sesion01.html       # Sesión individual del curso
├── sesion02.html       # Sesión individual del curso
├── ...
├── sesion64.html       # Última sesión del curso
└── images/             # Directorio de recursos multimedia
```

## Especificación de la API Web

### 1. API de Navegación

#### Endpoints de Página Principal

- **GET** `/index.html`
  - **Descripción**: Página principal del curso con índice completo
  - **Respuesta**: HTML completo con tabla de contenidos
  - **Funcionalidad**: Navegación a módulos y sesiones individuales

#### Endpoints de Sesiones

- **GET** `/sesion{N}.html` donde N = 01-64
  - **Descripción**: Página individual de cada sesión del curso
  - **Parámetros**:
    - `N`: Número de sesión (01-64)
  - **Respuesta**: HTML de la sesión específica
  - **Funcionalidad**: Contenido educativo estructurado con interactividad

### 2. API de Estilos (CSS)

#### Sistema de Variables CSS

```css
:root {
    --color-primary-blue: #007BFF;
    --color-secondary-emerald: #00a896;
    --color-bg-light: #f0f7f9;
    --color-card-bg: #e6f7ff;
    --color-highlight: #ffc107;
}
```

#### Componentes de UI Disponibles

- **Cards**: Sistema de tarjetas responsivas
- **Navigation**: Barra de navegación consistente
- **Grid Layouts**: Layouts responsivos de 2 y 3 columnas
- **Interactive Elements**: Botones y elementos interactivos

### 3. API de Interactividad (JavaScript)

#### Funciones de Evaluación

```javascript
// Funciones de quiz y evaluación por sesión
function showQuiz()                    // Sesión 01
function checkPktTask()               // Sesión 02
function maskQuiz()                   // Sesión 08
function reviewQuiz()                 // Sesión 61
function startFinalTheoreticalExam() // Sesión 62
function startFinalPracticalExam()   // Sesión 63
function courseClosure()              // Sesión 64
```

#### Sistema de Eventos

```javascript
// Event listeners automáticos
document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    // Asignación automática de eventos a botones
});
```

#### Funciones de Utilidad

```javascript
function updateFooter()  // Actualiza información de sesión en footer
```

## Estructura de Datos

### Modelo de Sesión

```javascript
{
    "id": "sesion{N}",
    "title": "Semana X, Sesión Y: Título del Tema",
    "subtitle": "Descripción del subtema",
    "module": "Módulo X",
    "week": "Semana Y",
    "session": "Sesión Z",
    "topics": [
        {
            "title": "Título del Tópico",
            "content": "Contenido educativo",
            "interactive_elements": ["button_id_1", "button_id_2"]
        }
    ],
    "navigation": {
        "previous": "sesion{N-1}.html",
        "next": "sesion{N+1}.html",
        "home": "index.html"
    }
}
```

### Modelo de Módulo

```javascript
{
    "id": "modulo{N}",
    "title": "Título del Módulo",
    "objective": "Objetivo del módulo",
    "duration": "Semanas X-Y",
    "sessions": [
        {
            "week": "Semana X",
            "session": "Sesión Y",
            "topic": "Tema de la sesión",
            "concepts": ["Concepto 1", "Concepto 2"],
            "software": "Software utilizado"
        }
    ]
}
```

## Funcionalidades de la API

### 1. Sistema de Navegación

- **Navegación secuencial**: Enlace automático entre sesiones
- **Navegación por módulos**: Acceso directo desde índice principal
- **Breadcrumbs**: Información de sesión actual en footer

### 2. Sistema de Evaluación Interactiva

- **Quizzes integrados**: Evaluaciones por sesión
- **Simulaciones**: Integración con Cisco Packet Tracer
- **Autoevaluación**: Sistema de verificación de conocimientos

### 3. Sistema de Contenido Dinámico

- **Contenido estructurado**: Secciones temáticas organizadas
- **Elementos multimedia**: Imágenes y diagramas integrados
- **Interactividad**: Botones y elementos de interacción

### 4. Sistema de Estilos Responsivos

- **Diseño adaptativo**: Compatible con múltiples dispositivos
- **Tema consistente**: Paleta de colores unificada
- **Componentes reutilizables**: Sistema de cards y layouts

## Especificaciones Técnicas

### Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados con variables CSS
- **JavaScript ES6+**: Lógica de aplicación moderna
- **Responsive Design**: Compatibilidad móvil

### Requisitos del Sistema

- **Navegador**: Compatible con navegadores modernos
- **JavaScript**: Habilitado para funcionalidad completa
- **Conexión**: Requerida para recursos externos (imágenes)

### Rendimiento

- **Tiempo de carga**: Optimizado para carga rápida
- **Recursos**: Imágenes optimizadas y CSS minificado
- **Caché**: Compatible con caché del navegador

## Endpoints de la API

### Página Principal

```http
GET /index.html
Content-Type: text/html
Response: Página principal con índice completo del curso
```

### Sesiones Individuales

```http
GET /sesion{N}.html
Content-Type: text/html
Parameters:
  - N: Número de sesión (01-64)
Response: Página HTML de la sesión específica
```

### Recursos Estáticos

```http
GET /styles.css
Content-Type: text/css
Response: Hoja de estilos centralizada

GET /scripts.js
Content-Type: application/javascript
Response: Lógica de aplicación JavaScript

GET /images/{filename}
Content-Type: image/*
Response: Recursos multimedia
```

## Casos de Uso

### 1. Navegación del Curso

1. Usuario accede a `/index.html`
2. Selecciona una sesión específica
3. Navega secuencialmente entre sesiones
4. Utiliza elementos interactivos para evaluación

### 2. Evaluación de Conocimientos

1. Usuario completa contenido de sesión
2. Interactúa con elementos de evaluación
3. Recibe retroalimentación inmediata
4. Progresa al siguiente nivel

### 3. Acceso a Recursos

1. Usuario accede a contenido multimedia
2. Descarga recursos adicionales
3. Utiliza herramientas de simulación
4. Documenta progreso

## Seguridad y Consideraciones

### Seguridad

- **XSS**: Sanitización de entrada en JavaScript
- **CSRF**: No aplicable (aplicación estática)
- **HTTPS**: Recomendado para producción

### Accesibilidad

- **WCAG 2.1**: Cumplimiento de estándares
- **Navegación por teclado**: Soporte completo
- **Lectores de pantalla**: Compatibilidad

### Mantenibilidad

- **Código modular**: Separación de responsabilidades
- **Documentación**: Comentarios en código
- **Versionado**: Control de versiones recomendado

## Extensibilidad

### Nuevas Funcionalidades

- **Sistema de usuarios**: Autenticación y perfiles
- **Progreso persistente**: Almacenamiento de avance
- **Analytics**: Métricas de uso y rendimiento
- **API REST**: Backend para funcionalidades avanzadas

### Integraciones Posibles

- **LMS**: Integración con sistemas de gestión de aprendizaje
- **Simuladores**: Integración con herramientas de simulación
- **Certificaciones**: Sistema de certificación integrado

## Conclusión

La API web del proyecto "Informática Redes" proporciona una plataforma educativa completa y bien estructurada para el aprendizaje de redes de computadoras. Su arquitectura modular y diseño responsivo la hacen adecuada para uso educativo tanto en entornos presenciales como virtuales.

La documentación presentada sirve como guía técnica para desarrolladores, administradores de sistemas y educadores que deseen entender, mantener o extender la funcionalidad de la aplicación.

---

**Versión**: 1.0  
**Fecha**: 2025  
**Autor**: JGMV-PTEL  
**Licencia**: Todos los derechos reservados
