<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/factura.php');

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


// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $factura = new factura;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.

    switch ($_GET[ACTION]) {
        //Leer todo
    case READ_ALL:
        if ($result[DATA_SET] = $factura->readAll()) {
            $result[STATUS] = SUCESS_RESPONSE;
        } elseif (Database::getException()) {
            $result[EXCEPTION] = Database::getException();
        } else {
            $result[EXCEPTION] = 'No hay datos registrados';
        }
        break;
    case SEARCH:
        $_POST = $factura->validateSpace($_POST);
        if ($_POST[SEARCH] == '') {
            $result[EXCEPTION] = 'Ingrese un valor para buscar';
        } elseif ($result[DATA_SET] = $factura->searchRows($_POST[SEARCH])) {
            $result[STATUS] = SUCESS_RESPONSE;
            $result[MESSAGE] = 'Valor encontrado';
        } elseif (Database::getException()) {
            $result[EXCEPTION] = Database::getException();
        } else {
            $result[EXCEPTION] = 'No hay coincidencias';
        }
        break;
    case CREATE:
        $_POST = $factura->validateSpace($_POST);
            $result[EXCEPTION] = $factura->setCodigo($_POST['codigo_update']) ? null : 'Codigo incorrecto';
            $result[EXCEPTION] = $factura->setDescripcion($_POST['descripcion_update']) ? null : 'Descripción no encontrada';
            $result[EXCEPTION] = $factura->setDireccion($_POST['direccion_update']) ? null : 'Direccion incorrecta';
            $result[EXCEPTION] = $factura->setSubtotal($_POST['subtotal_update']) ? null : 'Estado incorrecto';
            $result[EXCEPTION] = $factura->setIVA($_POST['IVA_update']) ? null : 'IVA incorrecto';
            $result[EXCEPTION] = $factura->setVenta($_POST['venta_update']) ? null : 'Fecha Gravada incorrecta';
            $result[EXCEPTION] = $factura->setIdInquilino($_POST['id_inquilino_update']) ? null : 'Inquilino incorrecto';
        if ($factura->createRow()) {
            $result[MESSAGE] = 'Registro creado correctamente';
            $result[DATA_SET] = $factura->readAll();
            $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
        } else {
            $result[EXCEPTION] = Database::getException();
        }
        break;
    case UPDATE:
            $_POST = $factura->validateSpace($_POST);
            $result[EXCEPTION] = $factura->setCodigo($_POST['codigo_update']) ? null : 'Codigo incorrecto';
            $result[EXCEPTION] = $factura->setDescripcion($_POST['descripcion_update']) ? null : 'Descripción no encontrada';
            $result[EXCEPTION] = $factura->setDireccion($_POST['direccion_update']) ? null : 'Direccion incorrecta';
            $result[EXCEPTION] = $factura->setSubtotal($_POST['subtotal_update']) ? null : 'Estado incorrecto';
            $result[EXCEPTION] = $factura->setIVA($_POST['IVA_update']) ? null : 'IVA incorrecto';
            $result[EXCEPTION] = $factura->setVenta($_POST['venta_update']) ? null : 'Fecha Gravada incorrecta';
            $result[EXCEPTION] = $factura->setIdInquilino($_POST['id_inquilino_update']) ? null : 'Inquilino incorrecto';
            $result[EXCEPTION] = $factura->setId($_POST['id_factura']) ? null : 'Id incorrecto';

        if ($factura->updateRow()) {
            $result[MESSAGE] = 'Registro modificado correctamente';
            $result[DATA_SET] = $factura->readAll();
            $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
        } else {
            $result[EXCEPTION] = Database::getException();
        }
        break;
    case DELETE:
        $result[EXCEPTION] = $factura->setId($_POST['id_factura']) ? null : 'Id incorrecto';

        if ($factura->deleteRow()) {
            $result[MESSAGE] = 'Registro eliminado correctamente';
            $result[DATA_SET] = $factura->readAll();
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