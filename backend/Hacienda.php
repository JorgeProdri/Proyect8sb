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
                    createHacienda($data);
                    break;

                case 'update':
                    updateHacienda($data);
                    break;

                case 'delete':
                    deleteHacienda($data);
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
        getHaciendas();
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();

// Funciones CRUD para la tabla hacienda

function createHacienda($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de inserción en la tabla
    $query = "INSERT INTO hacienda (nomb_hacienda, direccion_hacienda, contac_hacienda) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("ssi", $data['nomb_hacienda'], $data['direccion_hacienda'], $data['contac_hacienda']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Hacienda creada correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al crear hacienda: " . $stmt->error));
    }
}

function updateHacienda($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de actualización en la tabla
    $query = "UPDATE hacienda SET nomb_hacienda=?, direccion_hacienda=?, contac_hacienda=? WHERE cod_hacienda=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("ssi", $data['nomb_hacienda'], $data['direccion_hacienda'], $data['contac_hacienda'], $data['cod_hacienda']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Hacienda actualizada correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al actualizar hacienda: " . $stmt->error));
    }
}

function deleteHacienda($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de eliminación en la tabla
    $query = "DELETE FROM hacienda WHERE cod_hacienda=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $data['cod_hacienda']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Hacienda eliminada correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al eliminar hacienda: " . $stmt->error));
    }
}

function getHaciendas() {
    global $mysqli;

    // Ejemplo de consulta para obtener todos los datos de la tabla
    $query = "SELECT * FROM hacienda";
    $result = $mysqli->query($query);

    if ($result) {
        $haciendasData = array();
        while ($row = $result->fetch_assoc()) {
            $haciendasData[] = $row;
        }
        echo json_encode($haciendasData);
    } else {
        echo json_encode(array("error" => true, "message" => "Error al obtener datos de haciendas: " . $mysqli->error));
    }
}
?>