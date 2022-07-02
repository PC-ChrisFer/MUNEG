<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/tipo_propiedad.php');
require_once('../modelos/categoria.php');


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
    $tipo_propiedad = new tipo_propiedad;
    $categoria = new categoria;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET[ACTION]) {
            //Leer todo
        case READ_ALL:
            if ($result[DATA_SET] = $tipo_propiedad->readAll()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case "readAllCategorias":
            if ($result[DATA_SET] = $categoria->readAll()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case SEARCH:
            $_POST = $tipo_propiedad->validateSpace($_POST);
            if ($_POST[SEARCH] == '') {
                $result[EXCEPTION] = 'Ingrese un valor para buscar';
            } elseif ($result[DATA_SET] = $tipo_propiedad->searchRows($_POST[SEARCH])) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay coincidencias';
            }
            break;
        case CREATE:
            $_POST = $tipo_propiedad->validateSpace($_POST);
            $result[EXCEPTION] = $tipo_propiedad->setNombre($_POST['tipo_propiedad']) ? null : 'Nombre incorrecto';
            $result[EXCEPTION] = $tipo_propiedad->setCategoria($_POST['categoria']) ? null : 'categoria incorrecto';

            if ($tipo_propiedad->createRow()) {
                $result[MESSAGE] = 'Registro creado correctamente';
                $result[DATA_SET] = $tipo_propiedad->readAll();
                $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case UPDATE:
            $_POST = $tipo_propiedad->validateSpace($_POST);
            $result[EXCEPTION] = $tipo_propiedad->setNombre($_POST['tipo_propiedad_update']) ? null : 'Nombre incorrecto';
            $result[EXCEPTION] = $tipo_propiedad->setVisibilidad($_POST['visibilidad']) ? null : 'Visibilidad no encontrada';
            $result[EXCEPTION] = $tipo_propiedad->setId($_POST['id_tipo_propiedad']) ? null : 'Tipo Acabado incorrecto';
            $result[EXCEPTION] = $tipo_propiedad->setCategoria($_POST['categoria']) ? null : 'categoria incorrecto';


            if ($tipo_propiedad->updateRow()) {
                $result[MESSAGE] = 'Registro modificado correctamente';
                $result[DATA_SET] = $tipo_propiedad->readAll();
                $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case DELETE:
            $result[EXCEPTION] = $tipo_propiedad->setId($_POST['id_tipo_propidad']) ? null : 'Tipo Acabado incorrecto';

            if ($tipo_propiedad->deleteRow()) {
                $result[MESSAGE] = 'Registro eliminado correctamente';
                $result[DATA_SET] = $tipo_propiedad->readAll();
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
