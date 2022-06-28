<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/inquilino.php');

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
const READ_ESTADO_INQUILINO = 'readEstadoInquilino';
const READ_TIPO_INQUILINO = 'readTipoInquilino';
const SUCESS_RESPONSE = 1;

// NOMBRES DE PARAMETROS, DEBEN DE SER IGUALES AL ID Y NAME DEL INPUT DE EL FORMULARIO
const INQUILINO = 'inquilino';
const INQUILINO_ID = 'id';
const INQUILINO_NOMBRE = 'nombre_inquilino';
const INQUILINO_APELLIDO = 'apellido_inquilino';
const INQUILINO_DUI = 'dui';
const INQUILINO_NIT = 'nit';
const INQUILINO_TELEFONO = 'telefono';
const INQUILINO_CORREO = 'correo';
const INQUILINO_GENERO = 'genero';
const INQUILINO_FECHA_NACIMIENTO = 'fecha_nacimiento';
const INQUILINO_ESTADO = 'estado_inquilino';
const INQUILINO_TIPO = 'tipo_inquilino';
const ID_DETALLE = 'id_detalle';
const INQUILINO_ARCHIVO = 'archivo';
const TMP_NAME = 'tmp_name';


// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $inquilino = new inquilino;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET[ACTION]) {
            //Leer todo
        case READ_ALL:
            if ($result[DATA_SET] = $inquilino->readAll()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case SEARCH:
            $_POST = $inquilino->validateSpace($_POST);
            if ($_POST[SEARCH] == '') {
                $result[EXCEPTION] = 'Ingrese un valor para buscar';
            } elseif ($result[DATA_SET] = $inquilino->searchRows($_POST[SEARCH])) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay coincidencias';
            }
            break;
        case CREATE:
            $_POST = $inquilino->validateSpace($_POST);
            if (!$inquilino->setNombre($_POST[INQUILINO_NOMBRE])) {
                $result[EXCEPTION] = 'Nombre incorrecto';
            } else if (!$inquilino->setApellido($_POST[INQUILINO_APELLIDO])) {
                $result[EXCEPTION] = 'Apellido incorrecto';
            } else if (!$inquilino->setDUI($_POST[INQUILINO_DUI])) {
                $result[EXCEPTION] = 'DUI no valido';
            } else if (!$inquilino->setNIT($_POST[INQUILINO_NIT])) {
                $result[EXCEPTION] = 'NIT no valido';
            } else if (!$inquilino->setFechaNacmiento($_POST['fecha_nacimiento'])) {
                $result[EXCEPTION] = 'Número de telefono no valido';
            } else if (!$inquilino->setTelefono($_POST[INQUILINO_TELEFONO])) {
                $result[EXCEPTION] = 'Número de telefono no valido';
            } else if (!$inquilino->setCorreo($_POST[INQUILINO_CORREO])) {
                $result[EXCEPTION] = 'Correo electronico no valido';
            } else if (!$inquilino->setGenero($_POST[INQUILINO_GENERO])) {
                $result[EXCEPTION] = 'Genero no disponible';
            } elseif (!is_uploaded_file($_FILES[INQUILINO_ARCHIVO][TMP_NAME])) {
                $result[EXCEPTION] = 'Seleccione una imagen';
            } elseif (!$inquilino->setImage($_FILES[INQUILINO_ARCHIVO])) {
                $result[EXCEPTION] = $inquilino->getFileError();
            } else if (!$inquilino->setEstadoInquilino($_POST[INQUILINO_ESTADO])) {
                $result[EXCEPTION] = 'Estado incorrecto';
            } else if (!$inquilino->setTipoInquilino($_POST[INQUILINO_TIPO])) {
                $result[EXCEPTION] = 'Tipo incorrecto';
            } elseif ($inquilino->createRow()) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Empleado creado existosamente';
                if ($inquilino->saveFile($_FILES[INQUILINO_ARCHIVO], $inquilino->getRutaImagenes(), $inquilino->getImagen())) {
                    $result[MESSAGE] = 'Imagen ingresada correctanente';
                    if ($result[DATA_SET] = $inquilino->readAll()) {
                        $result[STATUS] = SUCESS_RESPONSE;
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                } else {
                    $result[MESSAGE] = 'Imagen no se a ingresado correctanente';
                    if ($result[DATA_SET] = $inquilino->readAll()) {
                        $result[STATUS] = SUCESS_RESPONSE;
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                }
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case READ_ONE:
            if (!$inquilino->setId($_POST[INQUILINO_ID])) {
                $result[EXCEPTION] = 'Empleado incorrecto';
            } elseif ($result[DATA_SET] = $inquilino->readOne()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'Empleado inexistente';
            }
            break;
        case UPDATE:
            $_POST = $inquilino->validateSpace($_POST);
            if (!$inquilino->setId($_POST[INQUILINO_ID])) {
                $result[EXCEPTION] = 'Nombre incorrecto';
            } else if (!$inquilino->setNombre($_POST[INQUILINO_NOMBRE])) {
                $result[EXCEPTION] = 'Nombre incorrecto';
            } else if (!$inquilino->setApellido($_POST[INQUILINO_APELLIDO])) {
                $result[EXCEPTION] = 'Apellido incorrecto';
            } else if (!$inquilino->setDUI($_POST[INQUILINO_DUI])) {
                $result[EXCEPTION] = 'DUI no valido';
            } else if (!$inquilino->setFechaNacmiento($_POST['fecha_nacimiento'])) {
                $result[EXCEPTION] = 'Número de telefono no valido';
            } else if (!$inquilino->setNIT($_POST[INQUILINO_NIT])) {
                $result[EXCEPTION] = 'NIT no valido';
            } else if (!$inquilino->setTelefono($_POST[INQUILINO_TELEFONO])) {
                $result[EXCEPTION] = 'Número de telefono no valido';
            } else if (!$inquilino->setCorreo($_POST[INQUILINO_CORREO])) {
                $result[EXCEPTION] = 'Correo electronico no valido';
            } else if (!$inquilino->setGenero($_POST[INQUILINO_GENERO])) {
                $result[EXCEPTION] = 'Genero no disponible';
            } else if (!$inquilino->setTelefono($_POST[INQUILINO_FECHA_NACIMIENTO])) {
                $result[EXCEPTION] = 'Fecha incorrecta';
            } elseif (!is_uploaded_file($_FILES[INQUILINO_ARCHIVO][TMP_NAME])) {
                $result[EXCEPTION] = 'Seleccione una imagen';
            } elseif (!$inquilino->setImage($_FILES[INQUILINO_ARCHIVO])) {
                $result[EXCEPTION] = $inquilino->getFileError();
            } else if (!$inquilino->setEstadoInquilino($_POST[INQUILINO_ESTADO])) {
                $result[EXCEPTION] = 'Estado incorrecto';
            } else if (!$inquilino->setTipoInquilino($_POST[INQUILINO_TIPO])) {
                $result[EXCEPTION] = 'Tipo incorrecto';
            } elseif ($inquilino->updateRow()) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'EMPLEADO modificada correctamente';
                if ($inquilino->saveFile($_FILES[INQUILINO_ARCHIVO], $inquilino->getRutaImagenes(), $inquilino->getImagen())) {
                    $result[MESSAGE] = 'Imagen ingresada correctanente';
                    if ($result[DATA_SET] = $inquilino->readAll()) {
                        $result[STATUS] = SUCESS_RESPONSE;
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                } else {
                    $result[MESSAGE] = 'Imagen no se a ingresado correctanente';
                    if ($result[DATA_SET] = $inquilino->readAll()) {
                        $result[STATUS] = SUCESS_RESPONSE;
                    } else {
                        $result[EXCEPTION] = 'No hay datos registrados';
                    }
                }
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case DELETE:
            if (!$inquilino->setId($_POST[INQUILINO_ID])) {
                $result[EXCEPTION] = 'Empleado incorrecto';
            } elseif ($inquilino->deleteRow()) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Empleado removido correctamente';
                if ($result[DATA_SET] = $inquilino->readAll()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                } else {
                    $result[EXCEPTION] = 'No hay datos registrados';
                }
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case READ_TIPO_INQUILINO:
            if ($result[DATA_SET] = $inquilino->readTipoInquilino()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case READ_ESTADO_INQUILINO:
            if ($result[DATA_SET] = $inquilino->readEstadoInquilino()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
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
