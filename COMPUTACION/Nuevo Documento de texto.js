 Script de Mantenimiento del Sistema
# Autor: Manuel
# Fecha: $(Get - Date - Format "yyyy-MM-dd")

# Configuración
$logFile = "$env:USERPROFILE\Desktop\Mantenimiento_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
$startTime = Get - Date
$totalSpaceFreed = 0

function Write-LogWrite - Log "=== INICIO DE MANTENIMIENTO DEL SISTEMA ==="
Write - Log "Hora de inicio: $startTime"

# 1. Limpieza de archivos temporales
Write - Log "\n[1/3] LIMPIEZA DE ARCHIVOS TEMPORALES"
$tempFolders = @(
    "$env:TEMP\*",
    "$env:WINDIR\Temp\*",
    "$env:SYSTEMROOT\Prefetch\*",
    "$env:SYSTEMROOT\Logs\CBS\*",
    "$env:SYSTEMROOT\SoftwareDistribution\Download\*"
)

foreach($folder in $tempFolders) {
    if (Test - Path $folder) {
        $sizeBefore = (Get - ChildItem $folder - Recurse - ErrorAction SilentlyContinue |
            Measure - Object - Property Length - Sum - ErrorAction SilentlyContinue).Sum / 1MB

        Remove - Item - Path $folder - Recurse - Force - ErrorAction SilentlyContinue

        $sizeAfter = (Get - ChildItem $folder - Recurse - ErrorAction SilentlyContinue |
            Measure - Object - Property Length - Sum - ErrorAction SilentlyContinue).Sum / 1MB

        $freed = [math]:: Round(($sizeBefore - $sizeAfter), 2)
        $totalSpaceFreed += $freed
        Write - Log "Limpieza completada: $folder - Liberados: ${freed} MB"
    }
}

# 2. Limpieza de la papelera de reciclaje
Write - Log "\n[2/3] LIMPIEZA DE LA PAPELERA DE RECICLAJE"
try {
    $recycleBin = (New - Object - ComObject Shell.Application).NameSpace(0xA)
    $itemsInRecycleBin = $recycleBin.Items().Count
    $recycleBin.InvokeVerb("Empty Recycle Bin")
    Write - Log "Papelera de reciclaje vaciada correctamente. Elementos eliminados: $itemsInRecycleBin"
} catch {
    Write - Log "Error al vaciar la papelera de reciclaje: $_"
}

# 3. Optimización del sistema
Write - Log "\n[3/3] OPTIMIZACIÓN DEL SISTEMA"

# Verificar tipo de disco(SSD o HDD) para desfragmentación
$drives = Get - PhysicalDisk | Where - Object { $_.MediaType - eq 'HDD' - and $_.HealthStatus - eq 'Healthy' }

foreach($drive in $drives) {
    Write - Log "Desfragmentando unidad $($drive.DeviceID) - $($drive.FriendlyName)..."
    try {
        Optimize - Volume - DriveLetter $drive.DeviceID - Defrag - Verbose 2 >& 1 | Out - Null
        Write - Log "Desfragmentación completada para la unidad $($drive.DeviceID)"
    } catch {
        Write - Log "Error al desfragmentar la unidad $($drive.DeviceID): $_"
    }
}

# Generar informe final
$endTime = Get - Date
$duration = New - TimeSpan - Start $startTime - End $endTime

Write - Log "\n=== RESUMEN DEL MANTENIMIENTO ==="
Write - Log "Hora de inicio: $startTime"
Write - Log "Hora de finalización: $endTime"
Write - Log "Duración total: $($duration.Hours)h $($duration.Minutes)m $($duration.Seconds)s"
Write - Log "Espacio total liberado: $([math]::Round($totalSpaceFreed, 2)) MB"
Write - Log "=== MANTENIMIENTO COMPLETADO ===\n"

# Mostrar notificación al usuario
Add - Type - AssemblyName System.Windows.Forms
$notify = New - Object System.Windows.Forms.NotifyIcon
$notify.Icon = [System.Drawing.SystemIcons]:: Information
$notify.BalloonTipTitle = "Mantenimiento del Sistema"
$notify.BalloonTipText = "Mantenimiento completado correctamente.`nEspacio liberado: $([math]::Round($totalSpaceFreed, 2)) MB"
$notify.Visible = $true
$notify.ShowBalloonTip(10000)

# Mantener la consola abierta
Write - Host "Presiona cualquier tecla para continuar..." - NoNewline
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')