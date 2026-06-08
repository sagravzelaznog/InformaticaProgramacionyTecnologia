<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de la base de datos (ajusta según tu entorno)
$dbFile = __DIR__ . '/users.db';
$excelFile = __DIR__ . '/usuarios_registrados.xlsx';

// Inicializar base de datos SQLite si no existe
if (!file_exists($dbFile)) {
    $db = new SQLite3($dbFile);
    $db->exec('CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        institucion TEXT,
        curso TEXT,
        access_key TEXT NOT NULL,
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    )');
} else {
    $db = new SQLite3($dbFile);
}

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $input) {
    try {
        // Validar datos
        $required = ['nombre', 'email', 'institucion', 'curso', 'access_key'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                throw new Exception("El campo $field es requerido");
            }
        }

        // Insertar en la base de datos
        $stmt = $db->prepare('INSERT INTO users (nombre, email, institucion, curso, access_key) 
                             VALUES (:nombre, :email, :institucion, :curso, :access_key)');
        
        $stmt->bindValue(':nombre', $input['nombre'], SQLITE3_TEXT);
        $stmt->bindValue(':email', $input['email'], SQLITE3_TEXT);
        $stmt->bindValue(':institucion', $input['institucion'], SQLITE3_TEXT);
        $stmt->bindValue(':curso', $input['curso'], SQLITE3_TEXT);
        $stmt->bindValue(':access_key', password_hash($input['access_key'], PASSWORD_BCRYPT), SQLITE3_TEXT);
        
        if ($stmt->execute()) {
            // Actualizar archivo Excel
            updateExcelFile($db, $excelFile);
            echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
        } else {
            throw new Exception('Error al guardar en la base de datos');
        }
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'download') {
    // Descargar archivo Excel
    if (file_exists($excelFile)) {
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="' . basename($excelFile) . '"');
        readfile($excelFile);
        exit;
    } else {
        http_response_code(404);
        echo 'Archivo no encontrado';
    }
}

// Función para actualizar el archivo Excel
function updateExcelFile($db, $filename) {
    // Requiere la librería PhpSpreadsheet
    require 'vendor/autoload.php';
    
    $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    
    // Encabezados
    $sheet->setCellValue('A1', 'ID');
    $sheet->setCellValue('B1', 'Nombre');
    $sheet->setCellValue('C1', 'Email');
    $sheet->setCellValue('D1', 'Institución');
    $sheet->setCellValue('E1', 'Curso/Grupo');
    $sheet->setCellValue('F1', 'Fecha de Registro');
    
    // Obtener datos
    $result = $db->query('SELECT * FROM users ORDER BY fecha_registro DESC');
    $row = 2;
    
    while ($user = $result->fetchArray(SQLITE3_ASSOC)) {
        $sheet->setCellValue('A' . $row, $user['id']);
        $sheet->setCellValue('B' . $row, $user['nombre']);
        $sheet->setCellValue('C' . $row, $user['email']);
        $sheet->setCellValue('D' . $row, $user['institucion']);
        $sheet->setCellValue('E' . $row, $user['curso']);
        $sheet->setCellValue('F' . $row, $user['fecha_registro']);
        $row++;
    }
    
    // Guardar archivo
    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
    $writer->save($filename);
}
?>
