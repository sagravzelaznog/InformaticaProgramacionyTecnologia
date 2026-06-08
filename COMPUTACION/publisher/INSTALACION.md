# Instalación del Sistema de Registro

Este documento explica cómo configurar el sistema de registro de usuarios con almacenamiento seguro de contraseñas.

## Requisitos

- Servidor web con PHP 7.4 o superior
- Extensión SQLite3 para PHP
- Composer (para instalar dependencias)

## Instalación

1. **Clonar el repositorio**
   ```
   git clone [URL_DEL_REPOSITORIO]
   cd publisher
   ```

2. **Instalar dependencias**
   ```
   composer require phpoffice/phpspreadsheet
   ```

3. **Configurar permisos**
   Asegúrate de que los siguientes directorios tengan permisos de escritura:
   - `/api`
   - `/api/users.db` (se creará automáticamente)
   - `/api/usuarios_registrados.xlsx` (se creará automáticamente)

4. **Configurar autenticación**
   Edita `admin.php` y cambia las credenciales de acceso:
   ```php
   $valid_username = 'admin';
   $valid_password = 'admin123';
   ```

## Uso

1. **Página de registro**
   - Los usuarios pueden registrarse en: `registro.html`
   - Se generará una clave de acceso única
   - Los datos se guardarán en la base de datos SQLite

2. **Panel de administración**
   - Accede a: `admin.php`
   - Credenciales predeterminadas:
     - Usuario: admin
     - Contraseña: admin123 (cambiar después de la instalación)

3. **Exportar datos**
   - Desde el panel de administración, haz clic en "Descargar Excel"
   - O accede directamente a: `api/save_user.php?action=download`

## Seguridad

- Las contraseñas se almacenan con hash bcrypt
- El panel de administración está protegido con autenticación básica
- Se recomienda configurar HTTPS en producción
- Cambia las credenciales predeterminadas

## Solución de problemas

- Si la base de datos no se crea, verifica los permisos de escritura
- Si el archivo Excel no se genera, asegúrate de que la extensión ZIP esté habilitada en PHP
- Revisa el registro de errores de PHP para ver mensajes detallados

## Notas adicionales

- Los datos se almacenan localmente en SQLite
- Se recomienda hacer copias de seguridad periódicas del archivo `users.db`
- Para producción, considera migrar a MySQL/MariaDB
