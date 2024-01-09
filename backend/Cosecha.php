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
                    createCosecha($data);
                    break;

                case 'update':
                    updateCosecha($data);
                    break;

                case 'delete':
                    deleteCosecha($data);
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
        getCosecha();
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();

// Funciones CRUD para la tabla cosecha

function createCosecha($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de inserción en la tabla
    $query = "INSERT INTO cosecha (fecha_cosecha, produc_cosecha, estado_cosecha, cod_lote) VALUES (?, ?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sdsi", $data['fecha_cosecha'], $data['produc_cosecha'], $data['estado_cosecha'], $data['cod_lote']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Datos de cosecha creados correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al crear datos de cosecha: " . $stmt->error));
    }
}

function updateCosecha($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de actualización en la tabla
    $query = "UPDATE cosecha SET fecha_cosecha=?, produc_cosecha=?, estado_cosecha=?, cod_lote=? WHERE cod_cosecha=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sdsii", $data['fecha_cosecha'], $data['produc_cosecha'], $data['estado_cosecha'], $data['cod_lote'], $data['cod_cosecha']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Datos de cosecha actualizados correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al actualizar datos de cosecha: " . $stmt->error));
    }
}

function deleteCosecha($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de eliminación en la tabla
    $query = "DELETE FROM cosecha WHERE cod_cosecha=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $data['cod_cosecha']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Datos de cosecha eliminados correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al eliminar datos de cosecha: " . $stmt->error));
    }
}

function getCosecha() {
    global $mysqli;

    // Ejemplo de consulta para obtener todos los datos de la tabla
    $query = "SELECT * FROM cosecha";
    $result = $mysqli->query($query);

    if ($result) {
        $cosechaData = array();
        while ($row = $result->fetch_assoc()) {
            $cosechaData[] = $row;
        }
        echo json_encode($cosechaData);
    } else {
        echo json_encode(array("error" => true, "message" => "Error al obtener datos de cosecha: " . $mysqli->error));
    }
}
?>