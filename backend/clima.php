<?php
require_once('conexion.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST': // Crear, Actualizar o Eliminar
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['action'])) {
            $action = $data['action'];

            switch ($action) {
                case 'create':
                    createClima($data);
                    break;

                case 'update':
                    updateClima($data);
                    break;

                case 'delete':
                    deleteClima($data);
                    break;

                default:
                    echo json_encode(array("error" => true, "message" => "Acción no válida"));
                    break;
            }
        } else {
            echo json_encode(array("error" => true, "message" => "Acción no especificada"));
        }

        break;

    case 'GET': // Leer
        getClima();
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();

// Funciones CRUD para la tabla clima

function createClima($data) {
    global $mysqli;

    $query = "INSERT INTO clima (fecha, temp, hum, rad_solar, lluvia, estado, id_device) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sdddiis", $data['fecha'], $data['temp'], $data['hum'], $data['rad_solar'], $data['lluvia'], $data['estado'], $data['id_device']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Datos de clima creados correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al crear datos de clima: " . $stmt->error));
    }
}

function updateClima($data) {
    global $mysqli;

    $query = "UPDATE clima SET temp=?, hum=?, rad_solar=?, lluvia=?, estado=? WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("dddisi", $data['temp'], $data['hum'], $data['rad_solar'], $data['lluvia'], $data['estado'], $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Datos de clima actualizados correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al actualizar datos de clima: " . $stmt->error));
    }
}

function deleteClima($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de eliminación en la tabla
    $query = "DELETE FROM clima WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Datos de clima eliminados correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al eliminar datos de clima: " . $stmt->error));
    }
}

function getClima() {
    global $mysqli;

    // Ejemplo de consulta para obtener todos los datos de la tabla
    $query = "SELECT * FROM clima";
    $result = $mysqli->query($query);

    if ($result) {
        $climaData = array();
        while ($row = $result->fetch_assoc()) {
            $climaData[] = $row;
        }
        echo json_encode($climaData);
    } else {
        echo json_encode(array("error" => true, "message" => "Error al obtener datos de clima: " . $mysqli->error));
    }
}
?>