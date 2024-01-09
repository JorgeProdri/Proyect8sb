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
                    createNotificacion($data);
                    break;

                case 'update':
                    updateNotificacion($data);
                    break;

                case 'delete':
                    deleteNotificacion($data);
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
        getNotificaciones();
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();

// Funciones CRUD para la tabla notificacion

function createNotificacion($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de inserción en la tabla
    $query = "INSERT INTO notificacion (IdSensor, fecha, descrip, cod_lote) VALUES (?, ?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sssi", $data['IdSensor'], $data['fecha'], $data['descrip'], $data['cod_lote']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Notificación creada correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al crear notificación: " . $stmt->error));
    }
}

function updateNotificacion($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de actualización en la tabla
    $query = "UPDATE notificacion SET IdSensor=?, fecha=?, descrip=?, cod_lote=? WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sssii", $data['IdSensor'], $data['fecha'], $data['descrip'], $data['cod_lote'], $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Notificación actualizada correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al actualizar notificación: " . $stmt->error));
    }
}

function deleteNotificacion($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de eliminación en la tabla
    $query = "DELETE FROM notificacion WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Notificación eliminada correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al eliminar notificación: " . $stmt->error));
    }
}

function getNotificaciones() {
    global $mysqli;

    // Ejemplo de consulta para obtener todos los datos de la tabla
    $query = "SELECT * FROM notificacion";
    $result = $mysqli->query($query);

    if ($result) {
        $notificacionesData = array();
        while ($row = $result->fetch_assoc()) {
            $notificacionesData[] = $row;
        }
        echo json_encode($notificacionesData);
    } else {
        echo json_encode(array("error" => true, "message" => "Error al obtener datos de notificaciones: " . $mysqli->error));
    }
}
?>