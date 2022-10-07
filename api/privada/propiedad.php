<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/propiedad.php');

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

//NOMBRES DE PARAMETROS, DEBEN DE SER IGUALES AL ID Y NAME DEL INPUT DE EL FORMULARIO


// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $propiedad = new propiedad;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.

    switch ($_GET[ACTION]) {
        case READ_ALL:
            if ($result[DATA_SET] = $propiedad->readAll()) {
                if ($result[DATA_SET] += $propiedad->readAllWithoutInquilino()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                }
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case "readAllDeleted":
            if ($result[DATA_SET] = $propiedad->readAllDeleted()) {
                if ($result[DATA_SET] += $propiedad->readAllDeletedWithoutInquilino()) {
                    $result[STATUS] = SUCESS_RESPONSE;
                }
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case SEARCH:
            $_POST = $propiedad->validateSpace($_POST);
            if ($_POST[SEARCH] == '') {
                $result[EXCEPTION] = 'Ingrese un valor para buscar';
            } elseif ($result[DATA_SET] = $propiedad->searchRows($_POST[SEARCH])) {
                $result[STATUS] = SUCESS_RESPONSE;
                $result[MESSAGE] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay coincidencias';
            }
            break;
        case CREATE:
            $_POST = $propiedad->validateSpace($_POST);
            $result[EXCEPTION] = $propiedad->setDireccion($_POST['direccion']) ? null : 'Dirreción incorrecta';
            $result[EXCEPTION] = $propiedad->setAreaPro($_POST['area_propiedad']) ? null : 'Area de propiedad no encontrada';
            $result[EXCEPTION] = $propiedad->setAreaCons($_POST['area_construccion_update']) ? null : 'Area de construcción no encontrada';
            $result[EXCEPTION] = $propiedad->setCodigo($_POST['codigo_update']) ? null : 'Código incorrecto';
            $result[EXCEPTION] = $propiedad->setPrecio($_POST['precio_update']) ? null : 'Precio incorrecto';
            $result[EXCEPTION] = $propiedad->setAlquiler($_POST['alquiler_update']) ? null : 'Alquiler incorrecto';
            $result[EXCEPTION] = $propiedad->setHabitaciones($_POST['habitaciones_update']) ? null : 'Habitaciones incorrectas';
            $result[EXCEPTION] = $propiedad->setPlantas($_POST['plantas_update']) ? null : 'Plantas incorrectas';
            $result[EXCEPTION] = $propiedad->setSanitario($_POST['sanitario_update']) ? null : 'Sanitario incorrecto';
            $result[EXCEPTION] = $propiedad->setEspacio($_POST['espacio_update']) ? null : 'Espacio incorrecto';
            $result[EXCEPTION] = $propiedad->setDescripcion($_POST['descripcion_update']) ? null : 'Descripción incorrecta';
            $result[EXCEPTION] = $propiedad->setIdMunicipio($_POST['id_municipio_update']) ? null : 'Municipio incorrecto';
            $result[EXCEPTION] = $propiedad->setIdTipoPropiedad($_POST['id_tipo_propiedad_update']) ? null : 'Dirreción incorrecta';
            $result[EXCEPTION] = $propiedad->setIdEmpleado($_POST['id_empleado_update']) ? null : 'Empleado incorrecto';
            $result[EXCEPTION] = $propiedad->setIdTipoAcabado($_POST['id_tipo_acabado_update']) ? null : 'Tipo de acabado incorrecto';
            $result[EXCEPTION] = $propiedad->setEstadoPropiedad($_POST['id_estado_propiedad_update']) ? null : 'Estado propiedad incorrecto';


            // GUARDANDO URL DE FIREBASE
            $result[EXCEPTION] = $propiedad->setImageName($_POST["imageName"]) ? null : "ARCHIVO INCORRECTO";

            //Validacion isset
            if ($_POST['id_inquilino'] != "") {
                if (!$propiedad->setIdInquilino($_POST['id_inquilino'])) {
                    $result[MESSAGE] = 'Algo anda mal';
                }
            } else {
                $propiedad->setIdInquilino(null);
            }
            if ($result[EXCEPTION] == null) {
                if ($propiedad->createRow()) {
                    $result[MESSAGE] = 'Registro creado correctamente';
                    $result[DATA_SET] = $propiedad->readAll();
                    $result[DATA_SET] += $propiedad->readAllWithoutInquilino();
                    $result[STATUS] = SUCESS_RESPONSE;
                } else {
                    $result[EXCEPTION] = Database::getException();
                }
            }
            break;
        case UPDATE:
            $_POST = $propiedad->validateSpace($_POST);
            $result[EXCEPTION] = $propiedad->setDireccion($_POST['direccion_update']) ? null : 'Dirreción incorrecta';
            $result[EXCEPTION] = $propiedad->setAreaPro($_POST['area_propiedad_update']) ? null : 'Area de propiedad no encontrada';
            $result[EXCEPTION] = $propiedad->setAreaCons($_POST['area_construccion_update']) ? null : 'Area de construcción no encontrada';
            $result[EXCEPTION] = $propiedad->setCodigo($_POST['codigo_update']) ? null : 'Código incorrecto';
            $result[EXCEPTION] = $propiedad->setPrecio($_POST['precio_update']) ? null : 'Precio incorrecto';
            $result[EXCEPTION] = $propiedad->setAlquiler($_POST['alquiler_update']) ? null : 'Alquiler incorrecto';
            $result[EXCEPTION] = $propiedad->setHabitaciones($_POST['habitaciones_update']) ? null : 'Habitaciones incorrectas';
            $result[EXCEPTION] = $propiedad->setPlantas($_POST['plantas_update']) ? null : 'Plantas incorrectas';
            $result[EXCEPTION] = $propiedad->setSanitario($_POST['sanitario_update']) ? null : 'Sanitario incorrecto';
            $result[EXCEPTION] = $propiedad->setEspacio($_POST['espacio_update']) ? null : 'Espacio incorrecto';
            $result[EXCEPTION] = $propiedad->setDescripcion($_POST['descripcion_update']) ? null : 'Descripción incorrecta';
            $result[EXCEPTION] = $propiedad->setIdMunicipio($_POST['municipio_update']) ? null : 'Municipio incorrecto';
            $result[EXCEPTION] = $propiedad->setIdTipoPropiedad($_POST['tipo_propiedad_update']) ? null : 'Dirreción incorrecta';
            $result[EXCEPTION] = $propiedad->setIdEmpleado($_POST['empleado_update']) ? null : 'Empleado incorrecto';
            $result[EXCEPTION] = $propiedad->setIdInquilino($_POST['inquilino_update'] ?? null) ? null : 'Inquilino incorrecto';
            $result[EXCEPTION] = $propiedad->setIdTipoAcabado($_POST['tipo_acabado_update']) ? null : 'Tipo de acabado incorrecto';
            $result[EXCEPTION] = $propiedad->setId($_POST['id_propiedad']) ? null : 'Id incorrecto';
            $result[EXCEPTION] = $propiedad->setVisibilidad($_POST['visibilidad']) ? null : "VISIBILIDAD INCORRECTA";

            // GUARDANDO URL DE FIREBASSE
            $result[EXCEPTION] = $propiedad->setImageName($_POST["imageName"]) ? null : "ARCHIVO INCORRECTO";

            if ($propiedad->updateRow()) {
                $result[MESSAGE] = 'Registro modificado correctamente';
                $result[DATA_SET] = $propiedad->readAll();
                $result[DATA_SET] += $propiedad->readAllWithoutInquilino();
                $result[STATUS] = SUCESS_RESPONSE;
            } else {
                $result[EXCEPTION] = Database::getException();
            }

            break;
        case DELETE:
            $result[EXCEPTION] = $propiedad->setId($_POST['id_propiedad']) ? null : 'Id incorrecto';
            if ($propiedad->deleteRow()) {
                $result[MESSAGE] = 'Registro eliminado correctamente';
                $result[DATA_SET] = $propiedad->readAll();
                $result[DATA_SET] += $propiedad->readAllWithoutInquilino();
                $result[STATUS] =  $result[DATA_SET] ? SUCESS_RESPONSE : 'No hay datos registrados';
            } else {
                $result[EXCEPTION] = Database::getException();
            }
            break;
        case 'graphPlantaPropiedad':
            if ($result[DATA_SET] = $propiedad->readPropiedadPlantas()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } else {
                $result[EXCEPTION] = 'No hay datos disponibles';
            }
            break;
        case 'graphTopPropietarios':
            if ($result[DATA_SET] = $propiedad->readTopPropietario()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } else {
                $result[EXCEPTION] = 'No hay datos disponibles';
            }
            break;
        case 'graphDepartamentoPropiedad':
            if ($result[DATA_SET] = $propiedad->readTopDepartamentos()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } else {
                $result[EXCEPTION] = 'No hay datos disponibles';
            }
            break;
        case 'graphPropiedadAlquilerVenta':
            if ($result[DATA_SET] = $propiedad->readPropiedadVentaAlquiler()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } else {
                $result[EXCEPTION] = 'No hay datos disponibles';
            }
            break;
        case 'graphPropiedadPropietario':
            if (!$propiedad->setPropietario($_POST['id_propietario'])) {
                $result[EXCEPTION] = 'Fecha Invalidad';
            } elseif ($result[DATA_SET] = $propiedad->readPropiedadesPropietarios()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } else {
                $result[EXCEPTION] = 'No hay datos disponibles';
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
