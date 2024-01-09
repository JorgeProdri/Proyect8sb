<?php
require_once('conexion.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST': // Crear
        $data = json_decode(file_get_contents("php://input"), true);
        break;

    case 'GET': // Leer
        break;

    case 'PUT': // Actualizar
    case 'PATCH':
        $data = json_decode(file_get_contents("php://input"), true);
        break;

    case 'DELETE': // Eliminar
        $data = json_decode(file_get_contents("php://input"), true);
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();