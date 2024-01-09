<?php
require_once('conexion.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['user_usuario']) && isset($data['pass_usuario'])) {
            $username = $data['user_usuario'];
            $password = md5($data['pass_usuario']); // Encriptar la contraseña

            $query = "SELECT * FROM usuarios WHERE user_usuario = ? AND pass_usuario = ?";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // Usuario autenticado correctamente
                $user = $result->fetch_assoc();
                echo json_encode(array("success" => true, "message" => "Inicio de sesión exitoso", "user" => $user));
            } else {
                // Usuario o contraseña incorrectos
                echo json_encode(array("error" => true, "message" => "Usuario o contraseña incorrectos"));
            }
        } else {
            echo json_encode(array("error" => true, "message" => "Datos incompletos para iniciar sesión"));
        }
        break;

    default:
        echo json_encode(array("error" => true, "message" => "Método no válido"));
        break;
}

$mysqli->close();
?>