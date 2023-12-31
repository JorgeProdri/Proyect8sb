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
                    createLote($data);
                    break;

                case 'update':
                    updateLote($data);
                    break;

                case 'delete':
                    deleteLote($data);
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
        getLotes();
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();

// Funciones CRUD para la tabla lote

function createLote($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de inserción en la tabla
    $query = "INSERT INTO lote (nomb_lote, dimenx_lote, dimeny_lote, estado_lote, cod_hacienda) VALUES (?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("siisi", $data['nomb_lote'], $data['dimenx_lote'], $data['dimeny_lote'], $data['estado_lote'], $data['cod_hacienda']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Lote creado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al crear lote: " . $stmt->error));
    }
}

function updateLote($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de actualización en la tabla
    $query = "UPDATE lote SET nomb_lote=?, dimenx_lote=?, dimeny_lote=?, estado_lote=?, cod_hacienda=? WHERE cod_lote=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("siiisi", $data['nomb_lote'], $data['dimenx_lote'], $data['dimeny_lote'], $data['estado_lote'], $data['cod_hacienda'], $data['cod_lote']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Lote actualizado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al actualizar lote: " . $stmt->error));
    }
}

function deleteLote($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de eliminación en la tabla
    $query = "DELETE FROM lote WHERE cod_lote=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $data['cod_lote']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Lote eliminado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al eliminar lote: " . $stmt->error));
    }
}

function getLotes() {
    global $mysqli;

    // Ejemplo de consulta para obtener todos los datos de la tabla
    $query = "SELECT * FROM lote";
    $result = $mysqli->query($query);

    if ($result) {
        $lotesData = array();
        while ($row = $result->fetch_assoc()) {
            $lotesData[] = $row;
        }
        echo json_encode($lotesData);
    } else {
        echo json_encode(array("error" => true, "message" => "Error al obtener datos de lotes: " . $mysqli->error));
    }
}
?>