<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/usuario.php');

//CONSTANTS

const ACTION = 'action';
const STATUS = 'status';
const SESSION = "session";
const MESSAGE = 'message';
const EXCEPTION = 'exception';
const DATASET = "dataset";
const USERNAME = 'username';
const ID_USUARIO = 'id_usuario';
const NOMBRES = 'nombres';
const ACTUAL = 'actual';
const NUEVA = 'nueva';
const SEARCH = 'search';
const READ_ALL = 'readAll';
const CREATE = 'create';
const DELETE = 'delete';
const UNDELETE = 'unDelete';
const SUCESS_RESPONSE = 1;
//NOMBRES DE PARAMETROS
const CLAVE = 'clave';
const ID = 'id';
const ALIAS_USUARIO = 'alias_usuario';
const CORREO = 'correo';
const NOMBRE_USUARIO = 'nombre_usuario';
const APELLIDOS = 'apellidos';
const CONFIRMAR = 'confirmar';



// Se comprueba si por medio del enpoint la variable "action" tiene un valor.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente, esto para poder acceder a sus functiones como "readOne".
    $usuario = new usuario;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, SESSION => 0, MESSAGE => null, EXCEPTION => null, DATASET => null, USERNAME => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se ejecutara lo especificado  "else".
    $result[SESSION] = 1;
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET[ACTION]) {
        case 'getUser':
            if (isset($_SESSION[ALIAS_USUARIO])) {
                $result[STATUS] = 1;
                $result[USERNAME] = $_SESSION[ALIAS_USUARIO];
            } else {
                $result[EXCEPTION] = 'Alias de usuario indefinido';
            }
            break;
        case "update":
            $_POST = $usuario->validateSpace($_POST);
            $usuario->setId($_POST['id']) ? null : "id incorrecto";
            $usuario->setNombre($_POST['nombre_usuario']) ? null : "nombre incorrecto";
            $usuario->setPassword($_POST['password_user']) ? null : "password incorrecto";
            if ($usuario->comparePassword($_POST['password_user'])) {
                $result[EXCEPTION] = 'Alias de usuario indefinido';
            } elseif ($usuario->editUser()) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Usuario actualizado correctamente';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case "passwordRecovery":
            $_POST = $usuario->validateSpace($_POST);
            $usuario->setId($_POST['id']) ? null : "id incorrecto";
            $usuario->setPassword($_POST['password_user']) ? null : "password incorrecto";
            if ($usuario->editPassword()) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Usuario actualizado correctamente';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        default:
            $result[EXCEPTION] = 'Acción  de la sesión';
    }
}
// Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
header('content-type: application/json; charset=utf-8');
// Se imprime el resultado en formato JSON y se retorna al controlador.
print(json_encode($result));
