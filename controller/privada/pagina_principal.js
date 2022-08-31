//Importar las constantes y metodos de components.js y api_constant.js
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";
import {
  SERVER,
  GET_METHOD,
  API_SUCESS_REQUEST,
} from "../constants/api_constant.js";
import {
  barGraph,
  doughnutGraph,
  generatePDF,
  lineGraph,
  obtenerFechaActual,
  pieGraph,
  polarAreaGraph,
} from "../components.js";
// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + "privada/usuario.php?action=";
const API_INQUILINO = SERVER + "privada/inquilino.php?action=";
const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";
const API_CONTRATO = SERVER + "privada/contrato.php?action=";
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";

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
  // Propiedades en venta
  await graphDoughnutPropieadadVenta();

  // Propiedades en generados
  await graphDoughnutContratosGenerados();

  // Propiedades top 5 empleados ventas/alquilar
  await graphDoughnutTopQueMasVendenOarquilan();

  // EMPLEADOS ACTIVOS E INACTIVOS
  await graphDoughnutEmpleadosACTIVOi();
});

//CREANDO FUNCTION LOGOUT
//@ts-ignore
window.logOut = async () => {
  let APIEndpoint = API_USUARIOS + "logOut";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

  if (APIResponse.status == API_SUCESS_REQUEST) {
    location.href = "index.html";
    return;
  }
  console.log("SOMETING WENT WRONG");
};

// Función para crear el grafico que, "Ventas por categorias del mes actual"
export async function graphBarInquilinoActivoInactivo() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_INQUILINO + "graphInquilino";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a graficar.
      let inquilinos = [];
      let nombre_estado = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        nombre_estado.push(row.nombre_estado);
        inquilinos.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de barras. Se encuentra en el archivo components.js
      barGraph(
        "chartInquilino",
        nombre_estado,
        inquilinos,
        "Cantidad de Inquilinos",
        "inquilino activos e inactivos"
      );
    } else {
      document.getElementById("chartInquilino").remove();
      console.log(response.exception);
    }
  }
}

// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphPiePlantasPropiedad() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_PROPIEDAD + "graphPlantaPropiedad";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let propiedades = [];
      let num_plantas = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        propiedades.push(row.count);
        num_plantas.push(row.plantas);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      pieGraph(
        "chartPlantasPropiedad",
        num_plantas,
        propiedades,
        "Cantidad de Propiedades por cantidad de plantas que posee."
      );
    } else {
      document.getElementById("chartPlantasPropiedad").remove();
      console.log(response.exception);
    }
  }
}

// Función para crear el grafico que, "Ventas por categorias del mes actual"
export async function graphLineTopPropietarios() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_PROPIEDAD + "graphTopPropietarios";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a graficar.
      let propietario = [];
      let num_propiedades = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        propietario.push(row.concat);
        num_propiedades.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de barras. Se encuentra en el archivo components.js
      lineGraph(
        "chartTopPropietario",
        propietario,
        num_propiedades,
        "Cantidad de propiedades",
        "Todos los propietarios y la cantidad de propiedades que tienen registradas"
      );
    } else {
      document.getElementById("chartTopPropietario").remove();
      console.log(response.exception);
    }
  }
}

// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphDoughnutTopDepartamento() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_PROPIEDAD + "graphDepartamentoPropiedad";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let departamento = [];
      let num_propiedades = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        departamento.push(row.departamento);
        num_propiedades.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      doughnutGraph(
        "chartTopDepartamento",
        departamento,
        num_propiedades,
        "Cantidad de Propiedades por cantidad de plantas que posee."
      );
    } else {
      document.getElementById("chartTopDepartamento").remove();
      console.log(response.exception);
    }
  }
}

// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphDoughnutPropieadadVenta() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_PROPIEDAD + "graphPropiedadAlquilerVenta";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let propiedad = [];
      let num_propiedades = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        propiedad.push(row.propiedad);
        num_propiedades.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      doughnutGraph(
        "chartPropiedadVenta",
        propiedad,
        num_propiedades,
        "Cantidad de Propiedades de casas en venta frente a las que estan en venta"
      );
    } else {
      document.getElementById("chartPropiedadVenta").remove();
      console.log(response.exception);
    }
  }
}

// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphDoughnutContratosGenerados() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_CONTRATO + "graphContrato";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let extract = [];
      let num_contrato = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        extract.push(row.extract);
        num_contrato.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      lineGraph(
        "chartContratosGenerados",
        extract,
        num_contrato,
        "Cantidad de contratos generados",
        "Cantidad de contratos generados por mes"
      );
    } else {
      document.getElementById("chartContratosGenerados").remove();
      console.log(response.exception);
    }
  }
}


// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphDoughnutTopQueMasVendenOarquilan() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_EMPLEADO + "graphTopEmpleado";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let nombre = [];
      let count = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        nombre.push(row.nombre);
        count.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      barGraph(
        "chartTopEmpleado",
        nombre,
        count,
        "Top 5 emplados que mas venden/alquilan casas",
        "Top 5 emplados que mas venden/alquilan casas"
     
      );
    } else {
      document.getElementById("chartTopEmpleado").remove();
      console.log(response.exception);
    }
  }
}


// Función para crear el grafico que, "empleados activos e inactivos"
export async function graphDoughnutEmpleadosACTIVOi() {
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_EMPLEADO + "graphEmpleadoActivoInactivo";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let nombre_estado = [];
      let count = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        nombre_estado.push(row.nombre_estado);
        count.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      pieGraph(
        "chartTopEmpleadoEstado",
        nombre_estado,
        count,
        "empleados activos e incativos"
      );
    } else {
      document.getElementById("chartTopEmpleadoEstado").remove();
      console.log(response.exception);
    }
  }
}