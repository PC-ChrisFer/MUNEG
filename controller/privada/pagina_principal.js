//Importar las constantes y metodos de components.js y api_constant.js
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";
import {
  SERVER,
  GET_METHOD,
  API_SUCESS_REQUEST,
  POST_METHOD,
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
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";
const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";
const API_CONTRATO = SERVER + "privada/contrato.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";


let datosPropiedad = {
  id_propiedad: "",
  direccion_propiedad: "",
  area_propiedad: "",
  area_construccion_propiedad: "",
  codigo: "",
  precio: 0,
  alquiler: "",
  habitaciones: 0,
  plantas: 0,
  sanitario: 0,
  espacioParqueo: 0,
  descripcion: "",
  tipo_acabadoID: "",
  municipioID: 0,
  tipoPropiedadID: 0,
  inquilinoID: 0,
  empleadoID: 0,
  visibilidad: true
};


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
        "Inquilino activos e inactivos"
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
        "Cantidad de Propiedades por el Departamento en el que se localizan."
      );
    } else {
      document.getElementById("chartTopDepartamento").remove();
      console.log(response.exception);
    }
  }
}

//Fernando

// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphDoughnutPropiedadVenta() {
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
      let estado = [];
      let num_propiedades = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        estado.push(row.estado);
        num_propiedades.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      doughnutGraph(
        "chartPropiedadVenta",
        estado,
        num_propiedades,
        "Cantidad de Propiedades de casas en venta frente a las que estan en alquiler"
      );
    } else {
      document.getElementById("chartPropiedadVenta").remove();
      console.log(response.exception);
    }
  }
}

// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphBarContratosGenerados() {
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
      let fecha_firma = [];
      let num_contrato = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        fecha_firma.push(row.extract);
        num_contrato.push(row.count);
      });
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      barGraph(
        "chartContratosGenerados",
        fecha_firma,
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
export async function graphBarTopVentasAlquiler() {
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
        "Cantidad de Transacciones",
        "Top 5 emplados que mas venden/alquilan casas"
     
      );
    } else {
      document.getElementById("chartTopEmpleado").remove();
      console.log(response.exception);
    }
  }
}


// Función para crear el grafico que, "empleados activos e inactivos"
export async function graphPieEmpleadosActivoInactivo() {
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
        "Empleados activos e incativos"
      );
    } else {
      document.getElementById("chartTopEmpleadoEstado").remove();
      console.log(response.exception);
    }
  }
}

window.OpenPdf= async () =>{
  String.prototype.exists = function() {
    var a = new XMLHttpRequest;
    a.open( "GET", this+"", false );
    a.send( null );
    return a.status === 200;
};
console.log("../../api/reporte/dfghdntlb.pdf".exists())
}

//CREACIÓN DE PDF
window.createPropiedadesBajosPDF = async () => {
  let APIEnpointReadPropiedad = API_REPORTES + "propiedades_accesibles";
  let APIEndpointObtenerUsuarioActual = API_USUARIOS + 'getUser';

  let readPropiedadResponse = await APIConnection(APIEnpointReadPropiedad, POST_METHOD);
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

  let tableContent = ``;

  console.log(readPropiedadResponse)
  readPropiedadResponse.dataset.forEach((element) => {
      tableContent += `
  <tr>
  <td>$${element.precio}</td>
  <td>${element.direccion}</td>
  <td>${element.codigo}</td>
  <td>${element.municipio}, ${element.departamento}</td>
  <td>${element.nombre} ${element.apellido}</td>
  <tr>
  `;
  });



  let generatedHTML = `<!doctype html>
  <html lang="es">
  
  <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <style>
          body {
              display: flex;
              justify-content: center;
              text-align: center;
  
          }
  
          #tabla-header {
              background-color: #007D84;
              color: aliceblue;
              padding: 10px;
              font-size: 40px;
              padding-bottom: 20px;
              margin-bottom: 10px;
  
          }
  
          #tabla-footer {
              background-color: #007D84;
              color: aliceblue;
              padding: 10px;
              text-align: right;
          }
  
          #tabla-header img {
              max-width: 65px;
          }
  
          /*Tabla de datos*/
          #tabla_datos {
              margin-top: 3%;
              margin-bottom: 3%;
              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  
          }
  
          /*Colores al encabezado*/
          #tabla_datos th {
              color: white;
              background-color: #018080;
          }
  
          /*Colores al cuerpo*/
          #tabla_datos tr {
              border: solid black 1px;
              background-color: #A1A39F;
          }
  
          #tabla_reporte {
              width: 100%;
              height: 60%;
              margin-top: 20px;
              
  
          }
  
          #tabla_reporte th,
          td {
              text-align: left;
              padding-left: 5px;
          }
  
          .text-footer {
              font-size: 10px;
              margin-top: 10px;
          }
      </style>
      <title>MUNEG S.A C.V</title>
  
  </head>
  
  <body>
      <!-- Tabla de Datos -->
      <div class="container-fluid" id="tabla_datos" style="width: 100%">
          <div class="container-fluid" id="tabla-header">
              <a>MUNEG</a>
          </div>
          <div class="container-fluid" id="tabla-header">
              <a>PROPIEDADES  CON LOS PRECIOS MÁS BAJOS</a>
          </div>
          <table class="table table-responsive table-bordered" id="tabla_reporte">
              <thead>
                  <tr>
                      <th>Creado por:</th>
                      <td>${ObtenerUsuarioActualResponse.username}</td>
                  </tr>
                  <tr>
                      <th>Fecha:</th>
                      <td>${obtenerFechaActual()}</td>
                  </tr>
                  <tr>
                      <th>Precio</th>
                      <th>Dirección</th>
                      <th>Código de propiedad</th>
                      <th>Municipio/Departamento</th>
                      <th>Nombre del Inquilino</th>
                  </tr>
              </thead>
              <tbody>
                  ${tableContent}
              </tbody>
          </table>
          <div class="container-fluid" id="tabla-footer">
          <a>MUNEG S.A C.V</a>
          </div>
      </div>
      </main>
  
  </body>
  
  </html>`;
  let res = await generatePDF(generatedHTML, "propiedades_accesibles" + ".pdf")

  window.open("../../api/reporte/" + "propiedades_accesibles" + ".pdf");
}

//CREACIÓN DE PDF
window.createPropiedadesAltosPDF = async () => {
  let APIEnpointReadPropiedad = API_REPORTES + "propiedades_valiosas";
  let APIEndpointObtenerUsuarioActual = API_USUARIOS + 'getUser';

  let readPropiedadResponse = await APIConnection(APIEnpointReadPropiedad, POST_METHOD);
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

  let tableContent = ``;

  readPropiedadResponse.dataset.forEach((element) => {
      tableContent += `
  <tr>
  <td>$${element.precio}</td>
  <td>${element.direccion}</td>
  <td>${element.codigo}</td>
  <td>${element.municipio}, ${element.departamento}</td>
  <td>${element.nombre} ${element.apellido}</td>
  <tr>
  `;
  });



  let generatedHTML = `<!doctype html>
  <html lang="es">
  
  <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <style>
          body {
              display: flex;
              justify-content: center;
              text-align: center;
  
          }
  
          #tabla-header {
              background-color: #007D84;
              color: aliceblue;
              padding: 10px;
              font-size: 40px;
              padding-bottom: 20px;
              margin-bottom: 10px;
  
          }
  
          #tabla-footer {
              background-color: #007D84;
              color: aliceblue;
              padding: 10px;
              text-align: right;
          }
  
          #tabla-header img {
              max-width: 65px;
          }
  
          /*Tabla de datos*/
          #tabla_datos {
              margin-top: 3%;
              margin-bottom: 3%;
              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  
          }
  
          /*Colores al encabezado*/
          #tabla_datos th {
              color: white;
              background-color: #018080;
          }
  
          /*Colores al cuerpo*/
          #tabla_datos tr {
              border: solid black 1px;
              background-color: #A1A39F;
          }
  
          #tabla_reporte {
              width: 100%;
              height: 60%;
              margin-top: 20px;
              
  
          }
  
          #tabla_reporte th,
          td {
              text-align: left;
              padding-left: 5px;
          }
  
          .text-footer {
              font-size: 10px;
              margin-top: 10px;
          }
      </style>
      <title>MUNEG S.A C.V</title>
  
  </head>
  
  <body>
      <!-- Tabla de Datos -->
      <div class="container-fluid" id="tabla_datos" style="width: 100%">
          <div class="container-fluid" id="tabla-header">
              <a>MUNEG</a>
          </div>
          <div class="container-fluid" id="tabla-header">
              <a>PROPIEDADES  CON LOS PRECIOS MÁS ALTOS</a>
          </div>
          <table class="table table-responsive table-bordered" id="tabla_reporte">
              <thead>
                  <tr>
                      <th>Creado por:</th>
                      <td>${ObtenerUsuarioActualResponse.username}</td>
                  </tr>
                  <tr>
                      <th>Fecha:</th>
                      <td>${obtenerFechaActual()}</td>
                  </tr>
                  <tr>
                      <th>Precio</th>
                      <th>Dirección</th>
                      <th>Código de propiedad</th>
                      <th>Municipio/Departamento</th>
                      <th>Nombre del Inquilino</th>
                  </tr>
              </thead>
              <tbody>
                  ${tableContent}
              </tbody>
          </table>
          <div class="container-fluid" id="tabla-footer">
          <a>MUNEG S.A C.V</a>
          </div>
      </div>
      </main>
  
  </body>
  
  </html>`;
  let res = await generatePDF(generatedHTML, "propiedades_valiosas_" + ".pdf")

  window.open("../../api/reporte/" + "propiedades_valiosas_" + ".pdf");

}
 function inactivityTime () {
  
  var time;

  window.onload = resetTimer;
  // DOM Events
  document.onmousedown = resetTimer;
  document.onkeydown = resetTimer;

  async function logout() {
    let APIEndpoint = API_USUARIOS + "logOut";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.status == API_SUCESS_REQUEST) {
      location.href = "index.html";  
      return;
    }
  }

  function resetTimer() {
      clearTimeout(time);
      time = setTimeout(logout, 3000)
  }
};