<?php
date_default_timezone_set('America/Guayaquil');

$host = "localhost";
$port = "3306";
$user = "root";
$pass = "EcoFlora2023";
$db = "cacao8sb";
$charset = "utf8mb4";

// Intentar establecer la conexión
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos.";
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>