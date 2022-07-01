<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/propietario.php');

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

const READ_TIPO_PROPIETARIO = 'readTipoPropietario';
const PROPIETARIO_ARCHIVO = 'archivo';
const TMP_NAME = 'tmp_name'; 

// NOMBRES DE PARAMETROS, DEBEN DE SER IGUALES AL ID Y NAME DEL INPUT DE EL FORMULARIO


// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $propietario = new propietario;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.

    switch ($_GET[ACTION]) {
        case READ_ALL:
            if ($result[DATA_SET] = $propietario->readAll()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case SEARCH:
            $_POST = $propietario->validateSpace($_POST);
            if ($_POST[SEARCH] == '') {
                $result[EXCEPTION] = 'Ingrese un valor para buscar';
            } elseif ($result[DATA_SET] = $propietario->searchRows($_POST[SEARCH])) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay coincidencias';
            }
            break;
        case CREATE:
            $_POST = $propietario->validateSpace($_POST);
                $result[EXCEPTION] = $propietario->setNombre($_POST['nombre']) ? null : 'Nombre incorrecto';
                $result[EXCEPTION] = $propietario->setApellido($_POST['apellido']) ? null : 'Apellido incorrecto';
                $result[EXCEPTION] = $propietario->setTelefono($_POST['telefono']) ? null : 'Telefono incorrecto';
                $result[EXCEPTION] = $propietario->setCorreo($_POST['correo_electronico']) ? null : 'Correo Electrónico incorrecto';
                $result[EXCEPTION] = $propietario->setFechaNacimiento($_POST['fecha_nacimiento']) ? null : 'Fecha de nacimiento incorrecto';
                $result[EXCEPTION] = $propietario->setGenero($_POST['genero']) ? null : 'Género incorrecto';
                $result[EXCEPTION] = $propietario->setDUI($_POST['DUI']) ? null : 'DUI incorrecto';
                if (!is_uploaded_file($_FILES[PROPIETARIO_ARCHIVO][TMP_NAME])) {
                    $result[EXCEPTION] = 'Seleccione una imagen';
                    } elseif (!$propietario->setImage($_FILES[PROPIETARIO_ARCHIVO])){
                    $result[EXCEPTION] = $propietario->getFileError();
                    }
                $result[EXCEPTION] = $propietario->setIdTipoPropietario($_POST['id_tipo_propietario']) ? null : 'Tipo de propietario incorrecto';

                if ($propietario->createRow()) {
                    $result[MESSAGE] = 'Registro creado correctamente';
                    if ($propietario->saveFile($_FILES[PROPIETARIO_ARCHIVO], $propietario->getRutaImagenes(), $propietario->getImagen())) {
                        $result[MESSAGE] = 'Imagen ingresada correctanente';
                        if ($result[DATA_SET] = $propietario->readAll()) {
                            $result[STATUS] = SUCESS_RESPONSE;
                        } else {
                            $result[EXCEPTION] = 'No hay datos registrados';
                        }
                    } else {
                        $result[MESSAGE] = 'Imagen no se a ingresado correctanente';
                        if ($result[DATA_SET] = $propietario->readAll()) {
                            $result[STATUS] = SUCESS_RESPONSE;
                        } else {
                            $result[EXCEPTION] = 'No hay datos registrados';
                        }
                    }
                } else {
                    $result[EXCEPTION] = Database::getException();
                }
            break;
        case UPDATE:
            $_POST = $propietario->validateSpace($_POST);
            $result[EXCEPTION] = $propietario->setNombre($_POST['nombre_update']) ? null : 'Nombre incorrecto';
            $result[EXCEPTION] = $propietario->setApellido($_POST['apellido_update']) ? null : 'Apellido incorrecto';
            $result[EXCEPTION] = $propietario->setTelefono($_POST['telefono_update']) ? null : 'Telefono incorrecto';
            $result[EXCEPTION] = $propietario->setCorreo($_POST['correo_electronico_update']) ? null : 'Correo Electrónico incorrecto';
            $result[EXCEPTION] = $propietario->setFechaNacimiento($_POST['fecha_nacimiento_update']) ? null : 'Fecha de nacimiento incorrecto';
            $result[EXCEPTION] = $propietario->setGenero($_POST['genero_update']) ? null : 'Género incorrecto';
            $result[EXCEPTION] = $propietario->setDUI($_POST['DUI_update']) ? null : 'DUI incorrecto';
            $result[EXCEPTION] = $propietario->setImagen($_POST['imagen_update']) ? null : 'Imagen incorrecto';
            $result[EXCEPTION] = $propietario->setIdTipoPropietario($_POST['id_tipo_propietario_update']) ? null : 'Tipo de propietario incorrecto';
            $result[EXCEPTION] = $propietario->setId($_POST['id']) ? null : 'Id incorrecto';
        
        if ($propietario->updateRow()) {
            $result[MESSAGE] = 'Registro modificado correctamente';
            if ($propietario->saveFile($_FILES[PROPIETARIO_ARCHIVO], $propietario->getRutaImagenes(), $propietario->getImagen())) {
                $result[MESSAGE] = 'Imagen ingresada correctanente';
                if ($result[DATA_SET] = $propietario->readAll()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                } else {
                    $result[EXCEPTION] = 'No hay datos registrados';
                }
            } else {
                $result[MESSAGE] = 'Imagen no se a ingresado correctanente';
                if ($result[DATA_SET] = $propietario->readAll()) {
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
        $result[EXCEPTION] = $propietario->setId($_POST['id']) ? null : 'Id incorrecto';
        if ($propietario->deleteRow()) {
            $result[MESSAGE] = 'Registro eliminado correctamente';
            $result[DATA_SET] = $propietario->readAll();
            $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
        } else {
            $result[EXCEPTION] = Database::getException();
        }
        break;
    case READ_TIPO_PROPIETARIO:
        if ($result[DATA_SET] = $propietario->readTipoPropietario()) {
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