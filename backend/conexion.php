<?php
date_default_timezone_set('America/Guayaquil');

$host = "localhost";
$port = "3306";
$user = "root";
$pass = "EcoFlora2023";
$db = "cacao8sb";
$charset = "utf8mb4";

try {
    $mysqli = new mysqli($host, $user, $pass, $db, $port);

    if ($mysqli->connect_errno) {
        throw new Exception("Error de conexión a la base de datos: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
    }

    $mysqli->set_charset("utf8");
} catch (Exception $e) {
    echo json_encode(array("error" => true, "message" => "Error en la conexión: " . $e->getMessage()));
    exit;
}
?>