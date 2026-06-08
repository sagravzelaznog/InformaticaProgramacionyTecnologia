<?php
// Verificación de autenticación básica
$valid_username = 'admin';
$valid_password = 'admin123'; // Cambia esto por una contraseña segura

// Verificar autenticación básica
if (!isset($_SERVER['PHP_AUTH_USER']) || 
    !isset($_SERVER['PHP_AUTH_PW']) || 
    $_SERVER['PHP_AUTH_USER'] !== $valid_username || 
    !password_verify($valid_password, password_hash($_SERVER['PHP_AUTH_PW'], PASSWORD_BCRYPT))) {
    
    header('WWW-Authenticate: Basic realm="Área Restringida"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Acceso no autorizado';
    exit;
}

// Conectar a la base de datos
$dbFile = __DIR__ . '/api/users.db';
if (!file_exists($dbFile)) {
    die('Base de datos no encontrada');
}

$db = new SQLite3($dbFile);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <style>
        body { padding: 20px; }
        .table-responsive { margin-top: 20px; }
        .actions { white-space: nowrap; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="mb-4">Panel de Administración</h1>
        
        <div class="row mb-4">
            <div class="col-md-6">
                <a href="api/save_user.php?action=download" class="btn btn-primary">
                    <i class="bi bi-download"></i> Descargar Excel
                </a>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Institución</th>
                        <th>Curso/Grupo</th>
                        <th>Fecha de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $result = $db->query('SELECT * FROM users ORDER BY fecha_registro DESC');
                    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                        echo "<tr>";
                        echo "<td>" . htmlspecialchars($row['id']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['nombre']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['institucion']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['curso']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['fecha_registro']) . "</td>";
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
