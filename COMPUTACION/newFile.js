{
    param([string], $message);
    $timestamp = Get - Date - Format; "[yyyy-MM-dd HH:mm:ss]";
    "$timestamp $message" | Tee - Object - FilePath; $logFile - Append;
}
