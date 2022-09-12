//Importar las constantes y metodos de components.js y api_constant.js
import {
  readRows,
  saveRow,
  searchRows,
  deleteRow,
  barGraph,
  generatePDF,
  obtenerFechaActual
} from "../components.js";
import { API_SUCESS_REQUEST, SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import {
  API_CREATE,
  API_UPDATE,
  GET_METHOD,
  POST_METHOD
} from "../constants/api_constant.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CONTRATO = SERVER + "privada/contrato.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';
const API_REPORTE = SERVER + "privada/pdf.php?action=";


// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_contrato = {
  id: 0,
  descripcion: " ",
  fecha_firma: " ",
  fecha_firma_final: " ",
  imagen: " ",
  id_propietario: " ",
  id_propiedad: " ",
  id_empleado: " ",
  id_inquilino: " ",
};

let datos_propietario = {
  id_propietario: 0,
  nombre: " ",
};

let datos_propiedad = {
  id_propiedad: 0,
  codigo: " ",
};

let datos_empleado = {
  id_empleado: 0,
  nombre: " ",
};

let datos_inquilino = {
  id_inquilino: 0,
  nombre: " ",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  //Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_CONTRATO, fillTableContrato);
  //Se llama las funciones de combobox de propietario
  await fillComboBoxPropietario();
  //Se llama las funciones de combobox de propiedad
  await fillComboBoxPropiedad();
  //Se llama las funciones de combobox de empleado
  await fillComboBoxEmpleado();
  //Se llama las funciones de combobox de inquilino
  await fillComboBoxInquilino();
  inactivityTime();
});

//Obtener los datos de combobox tipo propietario
async function fillComboBoxPropietario() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readPropietario";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propietario"
    ).innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propietario_update"
    ).innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`;
  });
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarPropietario = () => {
  datos_propietario.id_propietario =
    document.getElementById("id_propietario").value;
};

//Obtener los datos de combobox tipo empleado
async function fillComboBoxPropiedad() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readPropiedad";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propiedad"
    ).innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propiedad_update"
    ).innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`;
  });
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarPropiedad = () => {
  datos_propiedad.id_propiedad = document.getElementById("id_propiedad").value;
};

//Obtener los datos de combobox tipo empleado
async function fillComboBoxEmpleado() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readEmpleado";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_empleado"
    ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_empleado_update"
    ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
  });
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarEmpleado = () => {
  datos_empleado.id_empleado = document.getElementById("id_empleado").value;
};

//Obtener los datos de combobox tipo empleado
async function fillComboBoxInquilino() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readInquilino";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_inquilino"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_inquilino_update"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarInquilino = () => {
  datos_inquilino.id_inquilino = document.getElementById("id_inquilino").value;
};

//Función (ReadAll) llenar las tablas de información
export function fillTableContrato(dataset) {
  //Se define el contenido html
  let content = "";
  //Se llenan los elementos con la información proporcionada por la base de datos
  dataset.map((row) => {
    //El cuerpo del elemento html
    content += ` 
            <tr>  
                <td><img src="../../api/imagenes/contrato/${row.imagen}" width=100></td> 
                <td>${row.descripcion}</td>
                <td>${row.fecha_firma}</td> 
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                        <form method="post" id="read-one">
                            <a onclick="guardaDatosUpdate('${row.id_contrato}', '${row.descripcion}', '${row.fecha_firma}', '${row.id_propietario}', '${row.id_propiedad}', '${row.id_empleado}', '${row.id_inquilino}')" class="btn"  id="button_ver_mas">
                            <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardaDatosDelete('${row.id_contrato}')" class="btn"  id="button_ver_mas"
                            name="search">
                            <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                        </form>
                    </div>
                </td>
            </tr>
        `;
  });
  //Se escribe el id del contendor que se quiere llenar con el elemento html
  getElementById("tbody-Contrato").innerHTML = content;
}

//Función para cargar los datos del update
window.guardaDatosUpdate = (
  id_contrato,
  descripcion,
  fecha_firma,
  id_propietario,
  id_propiedad,
  id_empleado,
  id_inquilino
) => {
  //Se transfieren los datos del boton al json global
  datos_contrato.id = id_contrato;
  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
  //Se imprime la información en el modal
  getElementById("descripcion_update").value = String(descripcion);
  getElementById("fecha_firma_update").value = String(fecha_firma);
  getElementById("id_propietario_update").value = String(id_propietario);
  getElementById("id_propiedad_update").value = String(id_propiedad);
  getElementById("id_empleado_update").value = String(id_empleado);
  getElementById("id_inquilino_update").value = String(id_inquilino);
};

//Función para cargar el id para el delete
window.guardaDatosDelete = (id_contrato) => {
  //Se transfieren los datos del boton al json global
  datos_contrato.id = id_contrato;
  //Se llama el modal de borrar
  $("#eliminar").modal("show");
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_CONTRATO, "search-bar", fillTableContrato);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("insert_form"));
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow(API_CONTRATO, API_CREATE, parameters, fillTableContrato);
});

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_contrato["id"]);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_CONTRATO, API_UPDATE, parameters, fillTableContrato);
  // Cerrar el modal de actualizar
  $("#actualizar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_contrato.id);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_CONTRATO, parameters, fillTableContrato);
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al delete
  parameters.append("id_propiedad", datosPropiedad.id_propiedad);
  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await deleteRow(API_PROPIEDAD, parameters, fillTablePropiedad);
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});

// Función para crear el grafico que, "La cantidad de firmas realizada por los empleados durante un periodo de tiempo"
export async function graphBarContrato(fecha_firma_i, fecha_firma_f) {
  //Creo un formData para los parametros
  let parameters = new FormData();
  //Inserto el id_producto a los parametros
  parameters.append("fecha_firma", fecha_firma_i);
  parameters.append("fecha_firma_final", fecha_firma_f);
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_CONTRATO + "graphContrato2";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let nombre_empleado = [];
      let num_empleado = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        nombre_empleado.push(row.concat);
        num_empleado.push(row.count);
      });
      getElementById('graph_contrato').innerHTML = '<canvas id="chartContrato2" style="background-color: white; border-radius: 20px"></canvas>'
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      barGraph(
        "chartContrato2",
        nombre_empleado,
        num_empleado,
        "Número de Firmas.",
        "La cantidad de firmas realizada por los empleados durante un periodo de tiempo."
      );
    } else {
      console.log(response.exception);
    }
  }
}

//Funcion para generar grafico a traves del click de un boton
window.generarGrafico = async () => {
  datos_contrato.fecha_firma = getElementById("fecha_firma_inicial").value;
  datos_contrato.fecha_firma_final = getElementById("fecha_firma_final").value;
  console.log(datos_contrato.fecha_firma);
  console.log(datos_contrato.fecha_firma_final);
  await graphBarContrato(datos_contrato.fecha_firma, datos_contrato.fecha_firma_final);
};

//CREACIÓN DE PDF
window.createContratoOrdenPDF = async () => {
  let APIEnpointReadContrato = API_REPORTE + "contratos_orden";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';

  let readContratoResponse = await APIConnection(APIEnpointReadContrato, POST_METHOD);
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

  let tableContent = ``;

  readContratoResponse.dataset.forEach((element) => {
      tableContent += `
  <tr>
  <td>${element.fecha_firma}</td>
  <td>${element.id_contrato}</td>
  <td>${element.descripcion}</td>
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
              <a>CONTRATOS ORDENADOS POR FECHA DE FIRMA</a>
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
                      <th>Fecha de Firma/Creación</th>
                      <th>Número de Contrato</th>
                      <th>Descripción</th>
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
  let res = await generatePDF(generatedHTML, "contratos_fecha" + ".pdf")

  window.open("../../api/reporte/" + "contratos_fecha" + ".pdf");
}


var inactivityTime = function () {
  var time;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;

  async function logout() {
    let APIEndpoint = API_USUARIO + "logOut";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  
    if (APIResponse.status == API_SUCESS_REQUEST) {
      location.href = "index.html";
      return;
    }
    console.log("SOMETHING WENT WRONG");
  }

  function resetTimer() {
      clearTimeout(time);
      time = setTimeout(logout, 300000)
      // 1000 milliseconds = 1 second
  }
};