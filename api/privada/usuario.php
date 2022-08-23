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
    $result = array($_SESSION[ID_USUARIO] , STATUS => 0, SESSION => 0, MESSAGE => null, EXCEPTION => null, DATASET => null, USERNAME => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se ejecutara lo especificado  "else".
    if (isset($_SESSION[ID_USUARIO])) {
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
            case 'logOut':
                if (session_destroy()) {
                    $result[STATUS] = 1;
                    $result[MESSAGE] = 'Sesión eliminada correctamente';
                } else {
                    $result[EXCEPTION] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readOne':
                if ($result[DATASET] = $usuario->readOne($_SESSION['id_usuario'])) {
                    $result[STATUS] = 1;
                } elseif (Database::getException()) {
                    $result[EXCEPTION] = Database::getException();
                } else {
                    $result[EXCEPTION] = 'No hay datos registrados';
                }
                break;     
            case READ_ALL:
                if ($result[DATASET] = $usuario->readAllEmpleado()) {
                    $result[STATUS] = 1;
                } elseif (Database::getException()) {
                    $result[EXCEPTION] = Database::getException();
                } else {
                    $result[EXCEPTION] = 'No hay datos registrados';
                }
                break;
            case SEARCH:
                $_POST = $usuario->validateForm($_POST);
                if ($_POST[SEARCH] == '') {
                    $result[EXCEPTION] = 'Ingrese un valor para buscar';
                } elseif ($result[DATASET] = $usuario->searchRowsEmpleado($_POST[SEARCH])) {
                    $result[STATUS] = 1;
                    $result[MESSAGE] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result[EXCEPTION] = Database::getException();
                } else {
                    $result[EXCEPTION] = 'No hay coincidencias';
                }
                break; 
            case "update":
                $usuario->setId($_POST['id']) ? null : "id incorrecto";
                $usuario->setNombre($_POST['nombre_usuario']) ? null : "nombre incorrecto";
                $usuario->setTipoUsuario($_POST['tipo_usuario_update']) ? null : "tipo usuario incorrecto";
                $usuario->setEmpleado($_POST['empleado_update']) ? null : "empleado ID incorrecto";

                if ($usuario->updateRowEmpleado()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                    $result[MESSAGE] = 'Usuario actualizado correctamente';
                    if ($result[DATASET] = $usuario->readAllEmpleado()) {
                        $result[STATUS] = 1;
                    } elseif (Database::getException()) {
                        $result[EXCEPTION] = Database::getException();
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                }
                break;
            case DELETE:
                if (!$usuario->setId($_POST['id'])) {
                    $result[EXCEPTION] = 'Usuario incorrecto';
                } elseif ($usuario->deleteRow()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                    $result[MESSAGE] = 'Usuario removido correctamente';
                    if ($result[DATASET] = $usuario->readAllEmpleado()) {
                        $result[STATUS] = 1;
                    } elseif (Database::getException()) {
                        $result[EXCEPTION] = Database::getException();
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                    break;
                } else {
                    $result[EXCEPTION] = Database::getException();
                }
                break;
            default:
                $result[EXCEPTION] = 'Acción  de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET[ACTION]) {
            case DELETE:
                if (!$usuario->setId($_POST['id'])) {
                    $result[EXCEPTION] = 'Usuario incorrecto';
                } elseif ($usuario->deleteRow()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                    $result[MESSAGE] = 'Usuario removido correctamente';
                    if ($result[DATASET] = $usuario->readAllEmpleado()) {
                        $result[STATUS] = 1;
                    } elseif (Database::getException()) {
                        $result[EXCEPTION] = Database::getException();
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                    break;
                } else {
                    $result[EXCEPTION] = Database::getException();
                }
                break;
            case "update":
                $usuario->setId($_POST['id']) ? null : "id incorrecto";
                $usuario->setNombre($_POST['nombre_usuario']) ? null : "nombre incorrecto";
                $usuario->setTipoUsuario($_POST['tipo_usuario']) ? null : "tipo usuario incorrecto";
                $usuario->setEmpleado($_POST['empleado']) ? null : "empleado ID incorrecto";

                if ($usuario->updateRowEmpleado()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                    $result[MESSAGE] = 'Usuario actualizado correctamente';
                    if ($result[DATASET] = $usuario->readAllEmpleado()) {
                        $result[STATUS] = 1;
                    } elseif (Database::getException()) {
                        $result[EXCEPTION] = Database::getException();
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                }
                break;
            case 'readAll':
                if ($result[DATASET] = $usuario->readAllEmpleado()) {
                    $result[STATUS] = 1;
                    $result[MESSAGE] = 'Existe al menos un usuario registrado';
                } else {
                    $result[EXCEPTION] = 'No existen usuarios registrados';
                }
                break;
            case 'registerEmpleadoUser':
                $_POST = $usuario->validateForm($_POST);
                if (!$usuario->setNombre($_POST[NOMBRE_USUARIO])) {
                    $result[EXCEPTION] = 'Nombres incorrectos';
                } elseif ($_POST['contraseñaUsuarioCheck'] != $_POST['contraseñaUsuario']) {
                    $result[EXCEPTION] = 'Claves diferentes';
                } elseif (!$usuario->setPassword($_POST['contraseñaUsuarioCheck'])) {
                    $result[EXCEPTION] = $usuario->getPasswordError();
                    // arreglar
                } elseif ($usuario->createRow()) {
                    $result[STATUS] = 1;
                    $result[MESSAGE] = 'Usuario registrado correctamente';
                } else {
                    $result[EXCEPTION] = Database::getException();
                }
                break;
            case 'logIn':
                $_POST = $usuario->validateForm($_POST);
                $result[EXCEPTION] = $usuario->searchUser($_POST['nombre_usuario']) ? null : 'Alias incorrecto';
            
                if ($usuario->searchPassword($_POST['password'])) {
                    $result[STATUS] = 1;
                    $result[MESSAGE] = 'Autenticación correcta';
                    $_SESSION[ID_USUARIO] = $usuario->getId();
                    $_SESSION[ALIAS_USUARIO] = $usuario->getNombre();
                } else {
                    $result[EXCEPTION] = 'Clave incorrecta';
                }
                break;

            case 'checkSession':
                if (isset($_SESSION[ID_USUARIO])) {
                    $result[STATUS] = 1;
                }else{
                    $result[STATUS] = 0;
                }
                break;
            default:
                $result[EXCEPTION] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
