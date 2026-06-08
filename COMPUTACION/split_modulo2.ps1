# Create directory for split files
$outputDir = "modulo2_split"
if (-not (Test-Path -Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# Read the original HTML file
$html = Get-Content -Path "modulo2.html" -Raw -Encoding UTF8

# Define topic patterns
$topicPattern = '(?s)<div class="tema" id="(tema\d+)">(.+?)(?=<div class="tema"|$)'

# Extract all topics
$topics = [regex]::Matches($html, $topicPattern)

# Base HTML template (we'll extract the header and footer from the original)
$header = [regex]::Match($html, '(?s)^(.+?)<div class="tema"').Groups[1].Value
$footer = [regex]::Match($html, '(?s)</div>\s*</main>\s*</div>\s*<footer>(.+?)$').Value

# Process each topic
foreach ($topic in $topics) {
    $topicId = $topic.Groups[1].Value
    $topicContent = $topic.Groups[0].Value
    $topicNumber = [int]($topicId -replace '[^0-9]', '')
    
    # Create navigation links
    $prevLink = if ($topicNumber -gt 1) { "<a href=`"tema$($topicNumber-1).html`" class=`"btn btn-anterior`">Anterior: Tema $($topicNumber-1)</a>" } else { "" }
    $nextLink = if ($topicNumber -lt 16) { "<a href=`"tema$($topicNumber+1).html`" class=`"btn btn-siguiente`">Siguiente: Tema $($topicNumber+1)</a>" } else { "" }
    
    # Create the complete HTML for this topic
    $topicHtml = $header + $topicContent + "`n`n" + @"
    <div class="navegacion-temas">
        $prevLink
        $nextLink
    </div>
"@ + $footer
    
    # Save to file
    $outputFile = Join-Path -Path $outputDir -ChildPath "tema$topicNumber.html"
    $topicHtml | Out-File -FilePath $outputFile -Encoding utf8 -Force
    Write-Host "Created: $outputFile"
}

# Create an index file
$indexContent = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Módulo 2: Excel de Office - Índice</title>
    <link rel="stylesheet" href="estilos-modulos.css">
    <style>
        .topic-list { max-width: 800px; margin: 20px auto; }
        .topic-item { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
    </style>
</head>
<body>
    <nav class="nav-principal">
        <a href="index.html" class="nav-titulo">Computación</a>
        <div>
            <a href="index.html" class="nav-link">Inicio</a>
            <a href="modulo1.html" class="nav-link">Módulo 1</a>
            <a href="#" class="nav-link activo">Módulo 2</a>
            <a href="modulo3.html" class="nav-link">Módulo 3</a>
            <a href="modulo4.html" class="nav-link">Módulo 4</a>
            <a href="modulo5.html" class="nav-link">Módulo 5</a>
            <a href="modulo6.html" class="nav-link">Módulo 6</a>
        </div>
    </nav>

    <div class="main-container">
        <main class="main-modulo">
            <h1>Módulo 2: Excel de Office</h1>
            <p>Selecciona un tema para ver su contenido:</p>
            
            <div class="topic-list">
"@

# Add topic links to index
foreach ($i in 1..16) {
    $topicTitle = "Tema $i"
    # Try to get the actual topic title from the content
    $topicFile = Join-Path -Path $outputDir -ChildPath "tema$i.html"
    if (Test-Path $topicFile) {
        $content = Get-Content -Path $topicFile -Raw -Encoding UTF8
        $titleMatch = [regex]::Match($content, '<h2[^>]*>(.+?)</h2>')
        if ($titleMatch.Success) {
            $topicTitle = $titleMatch.Groups[1].Value
        }
    }
    
    $indexContent += "<div class='topic-item'><a href='modulo2_split/tema$i.html'><strong>Tema $i</strong>: $topicTitle</a></div>"
}

$indexContent += @"
            </div>
        </main>
    </div>
    
    <footer>
        <p>© 2025 Especialidad en Computación - Módulo 2: Excel de Office</p>
    </footer>
</body>
</html>
"@

# Save index file
$indexFile = "modulo2_index.html"
$indexContent | Out-File -FilePath $indexFile -Encoding utf8 -Force
Write-Host "Created: $indexFile"

Write-Host "`n¡Proceso completado! Se han creado los archivos en la carpeta '$outputDir' y el archivo índice '$indexFile'."
