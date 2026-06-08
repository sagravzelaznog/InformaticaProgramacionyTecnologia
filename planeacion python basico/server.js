/**
 * SERVIDOR BACKEND PARA SISTEMA DE APROBACIÓN DE USUARIOS
 * Maneja el envío de correos y aprobación de registros
 */

const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Configuración del transporter de email
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'mc.manuel.gonzalez.ptel@gmail.com',
        pass: process.env.EMAIL_PASS || 'tu_app_password_aqui' // Usar App Password de Gmail
    }
});

// Base de datos simple en memoria (en producción usar una DB real)
const pendingUsers = new Map();
const approvedUsers = new Map();

/**
 * Ruta principal - servir la aplicación
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Registrar nuevo usuario (pendiente de aprobación)
 */
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validaciones básicas
        if (!username || !email || !password || !role) {
            return res.status(400).json({ 
                success: false, 
                message: 'Todos los campos son obligatorios' 
            });
        }

        // Verificar si el usuario ya existe
        if (pendingUsers.has(email) || approvedUsers.has(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'El email ya está registrado o pendiente de aprobación' 
            });
        }

        // Generar token de aprobación
        const approvalToken = crypto.randomBytes(32).toString('hex');
        const expirationTime = Date.now() + (24 * 60 * 60 * 1000); // 24 horas

        // Guardar usuario pendiente
        const pendingUser = {
            username,
            email,
            password, // En producción, hashear aquí
            role,
            token: approvalToken,
            createdAt: new Date().toISOString(),
            expiresAt: expirationTime
        };

        pendingUsers.set(email, pendingUser);

        // Enviar correo de notificación al administrador
        await sendApprovalEmail(pendingUser);

        res.json({ 
            success: true, 
            message: 'Registro enviado para aprobación. Recibirás un correo cuando sea aprobado.' 
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
});

/**
 * Enviar correo de aprobación al administrador
 */
async function sendApprovalEmail(user) {
    try {
        const approvalUrl = `http://localhost:${PORT}/approve?token=${user.token}`;
        
        const mailOptions = {
            from: 'mc.manuel.gonzalez.ptel@gmail.com',
            to: 'mc.manuel.gonzalez.ptel@gmail.com',
            subject: `🔔 Nuevo Registro Pendiente - Curso Python: ${user.username}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1>🐍 Nuevo Registro - Curso Python</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #333; margin-bottom: 20px;">Detalles del Usuario</h2>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <p><strong>👤 Usuario:</strong> ${user.username}</p>
                            <p><strong>📧 Email:</strong> ${user.email}</p>
                            <p><strong>🎭 Rol:</strong> ${getRoleDisplayName(user.role)}</p>
                            <p><strong>📅 Fecha:</strong> ${new Date(user.createdAt).toLocaleString('es-ES')}</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${approvalUrl}" 
                               style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
                                      color: white; 
                                      padding: 15px 30px; 
                                      text-decoration: none; 
                                      border-radius: 8px; 
                                      font-weight: bold;
                                      display: inline-block;
                                      margin: 10px;">
                                ✅ Aprobar Usuario
                            </a>
                        </div>
                        
                        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <p style="margin: 0; color: #856404;">
                                <strong>⏰ Importante:</strong> Este enlace expira en 24 horas. 
                                Si no se aprueba en ese tiempo, el usuario deberá registrarse nuevamente.
                            </p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d;">
                            <p>Sistema de Aprobación - Curso Python Básico</p>
                            <p><small>Desarrollado por JGMV-PTEL</small></p>
                        </div>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Correo de aprobación enviado para: ${user.email}`);

    } catch (error) {
        console.error('Error enviando correo:', error);
        throw error;
    }
}

/**
 * Página de aprobación de usuarios
 */
app.get('/approve', (req, res) => {
    const token = req.query.token;
    
    if (!token) {
        return res.status(400).send(`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
                <h1 style="color: #dc3545;">❌ Token de Aprobación Inválido</h1>
                <p>El token de aprobación no es válido o ha expirado.</p>
                <a href="/" style="color: #667eea;">Volver al Curso</a>
            </div>
        `);
    }

    // Buscar usuario pendiente por token
    let pendingUser = null;
    for (const [email, user] of pendingUsers.entries()) {
        if (user.token === token) {
            pendingUser = user;
            break;
        }
    }

    if (!pendingUser) {
        return res.status(404).send(`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
                <h1 style="color: #dc3545;">❌ Usuario No Encontrado</h1>
                <p>El usuario asociado con este token no existe o ya fue procesado.</p>
                <a href="/" style="color: #667eea;">Volver al Curso</a>
            </div>
        `);
    }

    // Verificar expiración
    if (Date.now() > pendingUser.expiresAt) {
        pendingUsers.delete(pendingUser.email);
        return res.status(410).send(`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
                <h1 style="color: #ffc107;">⏰ Token Expirado</h1>
                <p>Este enlace de aprobación ha expirado. El usuario debe registrarse nuevamente.</p>
                <a href="/" style="color: #667eea;">Volver al Curso</a>
            </div>
        `);
    }

    // Mostrar página de aprobación
    const approvalHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Aprobar Usuario - Curso Python</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .approval-container {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 15px;
                    margin-bottom: 30px;
                }
                .user-info {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    text-align: left;
                }
                .user-info p {
                    margin: 10px 0;
                    font-size: 16px;
                }
                .approval-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin: 30px 0;
                }
                .btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                .btn-approve {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    color: white;
                }
                .btn-reject {
                    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                    color: white;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
            </style>
        </head>
        <body>
            <div class="approval-container">
                <div class="header">
                    <h1>🐍 Aprobar Usuario</h1>
                    <p>Curso Básico de Python</p>
                </div>
                
                <div class="user-info">
                    <h3>📋 Información del Usuario</h3>
                    <p><strong>👤 Usuario:</strong> ${pendingUser.username}</p>
                    <p><strong>📧 Email:</strong> ${pendingUser.email}</p>
                    <p><strong>🎭 Rol:</strong> ${getRoleDisplayName(pendingUser.role)}</p>
                    <p><strong>📅 Registrado:</strong> ${new Date(pendingUser.createdAt).toLocaleString('es-ES')}</p>
                </div>
                
                <div class="approval-buttons">
                    <button class="btn btn-approve" onclick="approveUser('${token}')">
                        ✅ Aprobar
                    </button>
                    <button class="btn btn-reject" onclick="rejectUser('${token}')">
                        ❌ Rechazar
                    </button>
                </div>
                
                <p style="color: #6c757d; font-size: 14px;">
                    Esta solicitud expira el ${new Date(pendingUser.expiresAt).toLocaleString('es-ES')}
                </p>
            </div>
            
            <script>
                async function approveUser(token) {
                    try {
                        const response = await fetch('/api/approve', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token, action: 'approve' })
                        });
                        
                        const result = await response.json();
                        
                        if (result.success) {
                            alert('✅ Usuario aprobado exitosamente');
                            window.location.href = '/';
                        } else {
                            alert('❌ Error: ' + result.message);
                        }
                    } catch (error) {
                        alert('❌ Error de conexión');
                    }
                }
                
                async function rejectUser(token) {
                    try {
                        const response = await fetch('/api/approve', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token, action: 'reject' })
                        });
                        
                        const result = await response.json();
                        
                        if (result.success) {
                            alert('❌ Usuario rechazado');
                            window.location.href = '/';
                        } else {
                            alert('❌ Error: ' + result.message);
                        }
                    } catch (error) {
                        alert('❌ Error de conexión');
                    }
                }
            </script>
        </body>
        </html>
    `;

    res.send(approvalHtml);
});

/**
 * API para aprobar/rechazar usuarios
 */
app.post('/api/approve', async (req, res) => {
    try {
        const { token, action } = req.body;

        if (!token || !action) {
            return res.status(400).json({ 
                success: false, 
                message: 'Token y acción son requeridos' 
            });
        }

        // Buscar usuario pendiente
        let pendingUser = null;
        for (const [email, user] of pendingUsers.entries()) {
            if (user.token === token) {
                pendingUser = user;
                break;
            }
        }

        if (!pendingUser) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        if (action === 'approve') {
            // Aprobar usuario
            approvedUsers.set(pendingUser.email, {
                ...pendingUser,
                approvedAt: new Date().toISOString(),
                approvedBy: 'admin'
            });

            // Enviar correo de bienvenida
            await sendWelcomeEmail(pendingUser);

            console.log(`✅ Usuario aprobado: ${pendingUser.email}`);
        }

        // Remover de pendientes
        pendingUsers.delete(pendingUser.email);

        res.json({ 
            success: true, 
            message: action === 'approve' ? 'Usuario aprobado exitosamente' : 'Usuario rechazado' 
        });

    } catch (error) {
        console.error('Error en aprobación:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
});

/**
 * Enviar correo de bienvenida al usuario aprobado
 */
async function sendWelcomeEmail(user) {
    try {
        const mailOptions = {
            from: 'mc.manuel.gonzalez.ptel@gmail.com',
            to: user.email,
            subject: `🎉 ¡Bienvenido al Curso de Python! - ${user.username}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1>🎉 ¡Bienvenido al Curso!</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #333;">¡Hola ${user.username}!</h2>
                        
                        <p style="font-size: 16px; line-height: 1.6;">
                            Tu registro ha sido <strong>aprobado exitosamente</strong> y ya tienes acceso completo al 
                            <strong>Curso Básico de Python</strong>.
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <h3 style="color: #667eea; margin-top: 0;">📋 Tus Credenciales</h3>
                            <p><strong>👤 Usuario:</strong> ${user.username}</p>
                            <p><strong>🎭 Rol:</strong> ${getRoleDisplayName(user.role)}</p>
                            <p><strong>🔗 Acceso:</strong> <a href="http://localhost:${PORT}" style="color: #667eea;">Ir al Curso</a></p>
                        </div>
                        
                        <div style="background: #e3f2fd; border: 1px solid #2196f3; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #1976d2;">
                                <strong>🚀 ¿Qué sigue?</strong><br>
                                Ya puedes iniciar sesión y comenzar tu aprendizaje en Python. 
                                ¡Explora todos los módulos y sesiones disponibles!
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="http://localhost:${PORT}" 
                               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      color: white; 
                                      padding: 15px 30px; 
                                      text-decoration: none; 
                                      border-radius: 8px; 
                                      font-weight: bold;
                                      display: inline-block;">
                                🐍 Comenzar Curso
                            </a>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d;">
                            <p>Curso Básico de Python - JGMV-PTEL</p>
                            <p><small>Si tienes alguna pregunta, no dudes en contactarnos</small></p>
                        </div>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Correo de bienvenida enviado a: ${user.email}`);

    } catch (error) {
        console.error('Error enviando correo de bienvenida:', error);
    }
}

/**
 * API para verificar estado de usuario
 */
app.get('/api/user-status/:email', (req, res) => {
    const email = req.params.email;
    
    if (approvedUsers.has(email)) {
        return res.json({ 
            success: true, 
            status: 'approved', 
            user: approvedUsers.get(email) 
        });
    }
    
    if (pendingUsers.has(email)) {
        return res.json({ 
            success: true, 
            status: 'pending', 
            message: 'Tu registro está pendiente de aprobación' 
        });
    }
    
    res.json({ 
        success: true, 
        status: 'not_found', 
        message: 'Usuario no encontrado' 
    });
});

/**
 * Función auxiliar para obtener nombre display del rol
 */
function getRoleDisplayName(role) {
    const roleNames = {
        'admin': 'Administrador',
        'teacher': 'Profesor',
        'student': 'Estudiante'
    };
    return roleNames[role] || role;
}

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📧 Sistema de aprobación activo para: mc.manuel.gonzalez.ptel@gmail.com`);
    console.log(`🔒 Usar App Password de Gmail para envío de correos`);
});

module.exports = app;
