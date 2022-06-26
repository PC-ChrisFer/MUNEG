<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/clientes.php');

// constants 
const ACTION = 'action';
const STATUS = 'status';
const MESSAGE = 'message';
const EXCEPTION = 'exception';
const DATA_SET = 'dataset';
const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';
const SEARCH = 'search';
const READ_ALL = 'readAll';
const SUCESS_RESPONSE = 1;


// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $clientes = new clientes;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET[ACTION]) {
        case READ_ALL:
            if ($result[DATA_SET] = $clientes->readAll()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case SEARCH:
            $_POST = $clientes->validateSpace($_POST);
            if ($_POST[SEARCH] == '') {
                $result[EXCEPTION] = 'Ingrese un valor para buscar';
            } elseif ($result[DATA_SET] = $clientes->searchRows($_POST[SEARCH])) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay coincidencias';
            }
            break;
        case UPDATE:
            $result[EXCEPTION] = $clientes->setNombre($_POST['nombre_cliente_update']) ? null : 'Nombre incorrecto';
            $result[EXCEPTION] = $clientes->setCorreo($_POST['correo_update']) ? null : 'Visibilidad no encontrada';
            $result[EXCEPTION] = $clientes->setId($_POST['id_cliente']) ? null : 'Identificador no encontrada';
            if ($clientes->updateRow()) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Datos guardados existosamente';
                $result[DATA_SET] = $clientes->readAll();
                $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';

            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case DELETE:
            $result[EXCEPTION] = $clientes->setId($_POST['id_cliente']) ? null : 'Identificador no encontrada';
            if ($clientes->deleteRow()) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Datos guardados existosamente';
                $result[DATA_SET] = $clientes->readAll();
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
