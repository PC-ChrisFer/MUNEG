<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/tipo_inquilino.php');

// constants 
const ACTION = 'action';
const STATUS = 'status';
const MESSAGE = 'message';
const EXCEPTION = 'exception';
const DATA_SET = 'dataset';
const SEARCH = 'search';
const READ_ALL = 'readAll';
const READ_ONE = 'readOne';
const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';
const SUCESS_RESPONSE = 1;

// NOMBRES DE PARAMETROS, DEBEN DE SER IGUALES AL ID Y NAME DEL INPUT DE EL FORMULARIO


// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $tipo_inquilino = new tipo_inquilino;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET[ACTION]) {
            //Leer todo
        case READ_ALL:
            if ($result[DATA_SET] = $tipo_inquilino->readAll()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
            case "readAllDeleted":
                if ($result[DATA_SET] = $tipo_inquilino->readAllDeleted()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                } elseif (Database::getException()) {
                    $result[EXCEPTION] = Database::getException();
                } else {
                    $result[EXCEPTION] = 'No hay datos registrados';
                }
                break;
        case SEARCH:
            $_POST = $tipo_inquilino->validateSpace($_POST);
            if ($_POST[SEARCH] == '') {
                $result[EXCEPTION] = 'Ingrese un valor para buscar';
            } elseif ($result[DATA_SET] = $tipo_inquilino->searchRows($_POST[SEARCH])) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay coincidencias';
            }
            break;
        case CREATE:
            $_POST = $tipo_inquilino->validateSpace($_POST);
            $result[EXCEPTION] = $tipo_inquilino->setNombre($_POST['tipo_inquilino']) ? null : 'Nombre incorrecto';
            if ($tipo_inquilino->createRow()) {
                $result[MESSAGE] = 'Registro creado correctamente';
                $result[DATA_SET] = $tipo_inquilino->readAll();
                $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case UPDATE:
            $_POST = $tipo_inquilino->validateSpace($_POST);
            $result[EXCEPTION] = $tipo_inquilino->setNombre($_POST['tipo_inquilino_update']) ? null : 'Nombre incorrecto';
            $_POST['visibilidad_update'] = $_POST['visibilidad_update'] == '1' ? 1 : 0;
            $result[EXCEPTION] = $tipo_inquilino->setVisibilidad($_POST['visibilidad_update']) ? null : 'Visibilidad no encontrada';
            $result[EXCEPTION] = $tipo_inquilino->setId($_POST['id_tipo_inquilino']) ? null : 'Id incorrecto';

            if ($tipo_inquilino->updateRow()) {
                $result[MESSAGE] = 'Registro modificado correctamente';
                $result[DATA_SET] = $tipo_inquilino->readAll();
                $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case 'delete':
            $result[EXCEPTION] = $tipo_inquilino->setId($_POST['id_tipo_inquilino']) ? null : 'Id incorrecto';

            if ($tipo_inquilino->deleteRow()) {
                $result[MESSAGE] = 'Registro eliminado correctamente';
                $result[DATA_SET] = $tipo_inquilino->readAll();
                $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        default:
            $result[EXCEPTION] = 'Acción no disponible dentro de la sesión';
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
