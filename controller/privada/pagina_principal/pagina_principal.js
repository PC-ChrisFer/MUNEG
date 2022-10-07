//@ts-check
import { APIConnection } from "../../APIConnection.js";
import {
  API_SUCESS_REQUEST, GET_METHOD, SERVER
} from "../../constants/api_constant.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { inactivityTime } from "../../soporte/soporte.js";
import { graphBarContratosGenerados, graphBarInquilinoActivoInactivo, graphBarTopVentasAlquiler, graphDoughnutPropiedadVenta, graphDoughnutTopDepartamento, graphLineTopPropietarios, graphPieEmpleadosActivoInactivo, graphPiePlantasPropiedad } from "./graphics.js";
import { test2 } from "./windowFunctions.js";

test2

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + "privada/usuario.php?action=";


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Función Para validar que exista un usuario en sesión
  await validateExistenceOfUser();
  //Crear los diferentes graficos
  //"INQUILINOS ACTIVOS E INACTIVOS"
  await graphBarInquilinoActivoInactivo();
  //"CANTIDAD DE CASA POR PLANTAS (cuantas casas tienen 1 planta o 2, 3)"
  await graphPiePlantasPropiedad();
  //TOP 5 DE LAS CASAS MÁS CARAS
  await graphLineTopPropietarios();
  // Propietarios y su cantidad de propiedades
  await graphDoughnutTopDepartamento();
  // CANTIDAD DE CASAS QUE ESTÁN EN ALQUILER FRENTE A LAS QUE ESTÁN EN VENTA
  await graphDoughnutPropiedadVenta();
  // CONTRATOS GENERADOS POR MES
  await graphBarContratosGenerados();
  // TOP 5 EMPLEADOS QUE MAS VENDEN/ALQUILAN CASAS
  await graphBarTopVentasAlquiler();
  // EMPLEADOS ACTIVOS E INACTIVOS
  await graphPieEmpleadosActivoInactivo();

  inactivityTime();
});



