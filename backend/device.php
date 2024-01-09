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
                    createDevice($data);
                    break;

                case 'update':
                    updateDevice($data);
                    break;

                case 'delete':
                    deleteDevice($data);
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
        getDevices();
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();

// Funciones CRUD para la tabla device

function createDevice($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de inserción en la tabla
    $query = "INSERT INTO device (name, descrip, estado, id_lote) VALUES (?, ?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sssi", $data['name'], $data['descrip'], $data['estado'], $data['id_lote']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Dispositivo creado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al crear dispositivo: " . $stmt->error));
    }
}

function updateDevice($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de actualización en la tabla
    $query = "UPDATE device SET name=?, descrip=?, estado=?, id_lote=? WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sssi", $data['name'], $data['descrip'], $data['estado'], $data['id_lote'], $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Dispositivo actualizado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al actualizar dispositivo: " . $stmt->error));
    }
}

function deleteDevice($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de eliminación en la tabla
    $query = "DELETE FROM device WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Dispositivo eliminado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al eliminar dispositivo: " . $stmt->error));
    }
}

function getDevices() {
    global $mysqli;

    // Ejemplo de consulta para obtener todos los datos de la tabla
    $query = "SELECT * FROM device";
    $result = $mysqli->query($query);

    if ($result) {
        $devicesData = array();
        while ($row = $result->fetch_assoc()) {
            $devicesData[] = $row;
        }
        echo json_encode($devicesData);
    } else {
        echo json_encode(array("error" => true, "message" => "Error al obtener datos de dispositivos: " . $mysqli->error));
    }
}
?>