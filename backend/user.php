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
                    createUsuario($data);
                    break;

                case 'update':
                    updateUsuario($data);
                    break;

                case 'delete':
                    deleteUsuario($data);
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
        getUsuarios();
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();

// Funciones CRUD para la tabla usuarios

function createUsuario($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Verificar si el usuario ya existe
    $existingUserQuery = "SELECT * FROM usuarios WHERE user_usuario = ?";
    $existingUserStmt = $mysqli->prepare($existingUserQuery);
    $existingUserStmt->bind_param("s", $data['user_usuario']);
    $existingUserStmt->execute();
    $existingUserResult = $existingUserStmt->get_result();

    if ($existingUserResult->num_rows > 0) {
        // El usuario ya existe, retornar un mensaje de error
        echo json_encode(array("error" => true, "message" => "El usuario ya existe"));
    } else {
        // Encriptar la contraseña en MD5
        $hashedPassword = md5($data['pass_usuario']);

        // Insertar el nuevo usuario en la tabla
        $insertQuery = "INSERT INTO usuarios (nomb_usuario, ape_usuario, user_usuario, pass_usuario, telefono_usuario, estado_usuario, cod_hacienda) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $insertStmt = $mysqli->prepare($insertQuery);
        $insertStmt->bind_param("ssssisi", $data['nomb_usuario'], $data['ape_usuario'], $data['user_usuario'], $hashedPassword, $data['telefono_usuario'], $data['estado_usuario'], $data['cod_hacienda']);

        if ($insertStmt->execute()) {
            echo json_encode(array("success" => true, "message" => "Usuario creado correctamente"));
        } else {
            echo json_encode(array("error" => true, "message" => "Error al crear usuario: " . $insertStmt->error));
        }
    }
}


function updateUsuario($data) {
    global $mysqli;

    $hashedPassword = md5($data['pass_usuario']);

    $query = "UPDATE usuarios SET nomb_usuario=?, ape_usuario=?, user_usuario=?, pass_usuario=?, telefono_usuario=?, estado_usuario=?, cod_hacienda=? WHERE cod_usuario=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("ssssisii", $data['nomb_usuario'], $data['ape_usuario'], $data['user_usuario'], $hashedPassword, $data['telefono_usuario'], $data['estado_usuario'], $data['cod_hacienda'], $data['cod_usuario']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Usuario actualizado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al actualizar usuario: " . $stmt->error));
    }
}


function deleteUsuario($data) {
    global $mysqli;

    // Validar y procesar los datos de $data
    // ...

    // Ejemplo de eliminación en la tabla
    $query = "DELETE FROM usuarios WHERE cod_usuario=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $data['cod_usuario']);
    
    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Usuario eliminado correctamente"));
    } else {
        echo json_encode(array("error" => true, "message" => "Error al eliminar usuario: " . $stmt->error));
    }
}

function getUsuarios() {
    global $mysqli;

    // Ejemplo de consulta para obtener todos los datos de la tabla
    $query = "SELECT * FROM usuarios";
    $result = $mysqli->query($query);

    if ($result) {
        $usuariosData = array();
        while ($row = $result->fetch_assoc()) {
            $usuariosData[] = $row;
        }
        echo json_encode($usuariosData);
    } else {
        echo json_encode(array("error" => true, "message" => "Error al obtener datos de usuarios: " . $mysqli->error));
    }
}
?>