/**
 * SERVICE WORKER - CURSO PYTHON BÁSICO
 * Versión 2.0.0 - PWA Optimizado
 */

'use strict';

// ========================================
// CONFIGURACIÓN
// ========================================

const CACHE_NAME = 'python-course-v2.0.0';
const STATIC_CACHE = 'python-course-static-v2';
const DYNAMIC_CACHE = 'python-course-dynamic-v2';

// Archivos críticos para cache
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.min.css',
    '/css/session.min.css',
    '/js/main.min.js',
    '/js/session.min.js',
    '/manifest.json',
    // Agregar más archivos críticos según sea necesario
];

// Archivos externos para cache
const EXTERNAL_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js'
];

// ========================================
// INSTALACIÓN DEL SERVICE WORKER
// ========================================

self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        Promise.all([
            // Cache de archivos estáticos
            caches.open(STATIC_CACHE).then(cache => {
                console.log('📦 Cacheando archivos estáticos...');
                return cache.addAll(STATIC_ASSETS);
            }),
            
            // Cache de recursos externos
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('🌐 Cacheando recursos externos...');
                return cache.addAll(EXTERNAL_ASSETS);
            })
        ]).then(() => {
            console.log('✅ Service Worker: Instalación completada');
            // Forzar activación inmediata
            return self.skipWaiting();
        })
    );
});

// ========================================
// ACTIVACIÓN DEL SERVICE WORKER
// ========================================

self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activando...');
    
    event.waitUntil(
        Promise.all([
            // Limpiar caches antiguos
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName.startsWith('python-course')) {
                            console.log('🗑️ Eliminando cache antiguo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Tomar control de todas las páginas
            self.clients.claim()
        ]).then(() => {
            console.log('✅ Service Worker: Activación completada');
        })
    );
});

// ========================================
// INTERCEPTAR REQUESTS (FETCH)
// ========================================

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Solo interceptar requests GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Estrategias de cache según el tipo de recurso
    if (isStaticAsset(request.url)) {
        event.respondWith(cacheFirst(request));
    } else if (isExternalAsset(request.url)) {
        event.respondWith(staleWhileRevalidate(request));
    } else if (isHTMLRequest(request)) {
        event.respondWith(networkFirst(request));
    } else {
        event.respondWith(cacheFirst(request));
    }
});

// ========================================
// ESTRATEGIAS DE CACHE
// ========================================

/**
 * Cache First - Para archivos estáticos
 */
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('⚠️ Error en cacheFirst:', error);
        return new Response('Recurso no disponible offline', { 
            status: 503, 
            statusText: 'Service Unavailable' 
        });
    }
}

/**
 * Stale While Revalidate - Para recursos externos
 */
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => {
        // Si falla la red, devolver cache si existe
        return cachedResponse;
    });
    
    return cachedResponse || fetchPromise;
}

/**
 * Network First - Para páginas HTML
 */
async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Devolver página offline si no hay cache
        return caches.match('/offline.html') || new Response(
            `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sin conexión - Curso Python</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        padding: 50px; 
                        background: #f5f5f5; 
                    }
                    .offline-container { 
                        max-width: 500px; 
                        margin: 0 auto; 
                        background: white; 
                        padding: 40px; 
                        border-radius: 10px; 
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                    }
                    .offline-icon { 
                        font-size: 4rem; 
                        color: #e74c3c; 
                        margin-bottom: 20px; 
                    }
                    h1 { 
                        color: #2c3e50; 
                        margin-bottom: 20px; 
                    }
                    p { 
                        color: #7f8c8d; 
                        line-height: 1.6; 
                    }
                    .retry-btn { 
                        background: #3498db; 
                        color: white; 
                        padding: 12px 24px; 
                        border: none; 
                        border-radius: 5px; 
                        cursor: pointer; 
                        font-size: 16px; 
                        margin-top: 20px; 
                    }
                    .retry-btn:hover { 
                        background: #2980b9; 
                    }
                </style>
            </head>
            <body>
                <div class="offline-container">
                    <div class="offline-icon">📡</div>
                    <h1>Sin conexión a internet</h1>
                    <p>No se pudo cargar esta página. Verifica tu conexión a internet e intenta nuevamente.</p>
                    <button class="retry-btn" onclick="window.location.reload()">
                        Intentar nuevamente
                    </button>
                </div>
            </body>
            </html>
            `,
            { 
                headers: { 'Content-Type': 'text/html' } 
            }
        );
    }
}

// ========================================
// UTILIDADES
// ========================================

function isStaticAsset(url) {
    return url.includes('/css/') || 
           url.includes('/js/') || 
           url.includes('/assets/') ||
           url.includes('.css') || 
           url.includes('.js') ||
           url.includes('.png') || 
           url.includes('.jpg') || 
           url.includes('.svg');
}

function isExternalAsset(url) {
    return url.includes('cdnjs.cloudflare.com') || 
           url.includes('fonts.googleapis.com') ||
           url.includes('fonts.gstatic.com');
}

function isHTMLRequest(request) {
    return request.headers.get('accept').includes('text/html');
}

// ========================================
// SINCRONIZACIÓN EN BACKGROUND
// ========================================

self.addEventListener('sync', event => {
    console.log('🔄 Service Worker: Sincronización en background');
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Aquí se pueden sincronizar datos pendientes
        console.log('✅ Sincronización completada');
    } catch (error) {
        console.error('❌ Error en sincronización:', error);
    }
}

// ========================================
// NOTIFICACIONES PUSH
// ========================================

self.addEventListener('push', event => {
    console.log('🔔 Service Worker: Push notification recibida');
    
    const options = {
        body: '¡Nueva sesión disponible en el Curso de Python!',
        icon: '/assets/images/icon-192.png',
        badge: '/assets/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver curso',
                icon: '/assets/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/assets/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Curso Python Básico', options)
    );
});

// ========================================
// MANEJO DE NOTIFICACIONES
// ========================================

self.addEventListener('notificationclick', event => {
    console.log('👆 Service Worker: Notificación clickeada');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// ========================================
// MENSAJES DEL CLIENTE
// ========================================

self.addEventListener('message', event => {
    console.log('💬 Service Worker: Mensaje recibido', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// ========================================
// LOGGING Y MONITOREO
// ========================================

// Función para logging estructurado
function log(level, message, data = null) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        data,
        userAgent: self.navigator.userAgent
    };
    
    console.log(`[${level.toUpperCase()}] ${message}`, data || '');
    
    // En un entorno de producción, aquí se enviaría a un servicio de logging
}

// Inicialización
log('info', 'Service Worker iniciado', { version: CACHE_NAME });






