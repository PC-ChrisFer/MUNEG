<?php
//Llama a otros documentos de php respectivo, el database, el validador, y el respectivo modelo
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../modelos/pdf.php');

// constants 
const ACTION = 'action';
const STATUS = 'status';
const MESSAGE = 'message';
const EXCEPTION = 'exception';
const DATA_SET = 'dataset';
const SEARCH = 'search';
const READ_ALL = 'readAll';
const READ_ONE = 'readOne';
const DELETE = 'delete';
const CREATE = 'create';
const UPDATE = 'update';
const SUCESS_RESPONSE = 1;

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET[ACTION])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $reporte_pdf = new Reportes_PDF;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array(STATUS => 0, MESSAGE => null, EXCEPTION => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET[ACTION]) {
            //Leer todo
        case 'propiedad_vendida_alquilada':
            if (!$reporte_pdf->setFechaFirma($_POST['fecha_firma'])) {
                $result[EXCEPTION] = 'fecha de firma invalida';
            } elseif ($result[DATA_SET] = $reporte_pdf->readPropiedadVendidasAlquiladas()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'propiedad_tipo_acabado':
            if (!$reporte_pdf->setIdTipoAcabado($_POST['id_tipo_acabado'])) {
                $result[EXCEPTION] = 'Identificador de tipo acabado incorrecto';
            } elseif ($result[DATA_SET] = $reporte_pdf->readPropiedadTipoAcabado()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'propiedad_tipo_propiedad':
            if (!$reporte_pdf->setIdTipoPropiedad($_POST['id_tipo_propiedad'])) {
                $result[EXCEPTION] = 'Identificador de tipo propiedad incorrecto';
            } elseif ($result[DATA_SET] = $reporte_pdf->readPropiedadTipoPropiedad()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'propiedad_departamento':
            if (!$reporte_pdf->setIdDepartamento($_POST['id_departamento'])) {
                $result[EXCEPTION] = 'Identificador de departamento incorrecto';
            } elseif ($result[DATA_SET] = $reporte_pdf->readPropiedadDepartamento()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'factura':
            if ($result[DATA_SET] = $reporte_pdf->readFactura()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'factura_mes':
            if (!$reporte_pdf->setFechaFactura($_POST['fecha_factura'])) {
                $result[EXCEPTION] = 'fecha de fecha invalida';
            } elseif ($result[DATA_SET] = $reporte_pdf->readFacturaMes()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'propietario_tipo_propietario':
            if (!$reporte_pdf->setIdTipoPropietario($_POST['id_tipo_propietario'])) {
                $result[EXCEPTION] = 'fecha de fecha invalida';
            } elseif ($result[DATA_SET] = $reporte_pdf->readPropietarioTipoPropietario()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'total_acabado':
            if ($result[DATA_SET] = $reporte_pdf->readTotalTipoAcabado()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'propiedades_accesibles':
            if ($result[DATA_SET] = $reporte_pdf->readPropiedadesAccesibles()) {
                $result[STATUS] = SUCESS_RESPONSE;
            } elseif (Database::getException()) {
                $result[EXCEPTION] = Database::getException();
            } else {
                $result[EXCEPTION] = 'No hay datos registrados';
            }
            break;
        case 'create_pdf':
            $_POST = $reporte_pdf->validateSpace($_POST);
            //FALTA GUARDAR NOMBRE EN DB
            // FALTA LA GENERACION DEL NOMBRE
            if (!is_uploaded_file($_FILES['pdf']['tmp_name'])) {
                $result[EXCEPTION] = 'Seleccione pdf';
            } elseif (!$reporte_pdf->setPDF($_FILES['pdf'])) {
                $result[EXCEPTION] = $producto->getFileError();
            }
            if ($reporte_pdf->saveFile($_FILES['pdf'], $reporte_pdf->getRutapdf(), $_POST['nombreReporte'])) {
                $result[MESSAGE] = 'Imagen ingresada correctanente';
            } else {
                $result[MESSAGE] = "TODO MAL";
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
