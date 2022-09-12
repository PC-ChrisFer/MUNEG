//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { deleteRow, readRows, saveRow, readDeletedRowns, generatePDF, obtenerFechaActual } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE, POST_METHOD } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";


//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";


// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
let datos_gestion_acabado = {
  id_gestion_acabado: "",
  nombre_gestion_acabado: "",
  visibilidad: true,
};

let isWatchinDeletedData = false


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);
  getElementById('textoSwitch').innerHTML = "Hacer invisible"
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
function fillTableGestionAcabado(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
             <tr>
             <td>${row.nombre_tipo}</td>
             <td>${row.visibilidad}</td>
             <td class="d-flex justify-content-center">
             <a onclick="guardarDatosUpdate(${row.id_tipo_acabado},${row.visibilidad},'${row.nombre_tipo}')" class="btn" id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_acabado})" class="btn" id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
             <a onclick="generarReporteTipoAcabado(${row.id_tipo_acabado},'${row.nombre_tipo}')" class="btn" id="button_ver_mas">generar reporte</a>
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  getElementById("tbody-tipo-acabado").innerHTML = content;
}


window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_GESTION_ACABADO, fillTableGestionAcabado)
    isWatchinDeletedData = true
  } else {
    await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);
    isWatchinDeletedData = false
  }
    getElementById("verDatosliminados").checked === true ?  getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
};

window.cambiarVisibilidadDeResgistro = () => {
if(isWatchinDeletedData) {
  getElementById("eliminarElemento").checked === true
  ? (datos_gestion_acabado.visibilidad = true)
  : (datos_gestion_acabado.visibilidad = false);

} else {
  getElementById("eliminarElemento").checked === true
    ? (datos_gestion_acabado.visibilidad = false)
    : (datos_gestion_acabado.visibilidad = true);
}
};


//Función para cargar los datos del update
window.guardarDatosUpdate = (
  id_gestion_acabado,
  visibilidad,
  nombre_tipo_acabado
) => {
  //Se transfieren los datos del boton al json global  
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  datos_gestion_acabado.visibilidad = visibilidad;
  //Se imprime la información en el modal
  getElementById("tipo_acabado_update").value = String(nombre_tipo_acabado);
  getElementById("eliminarElemento").checked = false

  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_gestion_acabado) => {
  //Se transfieren los datos del boton al json global  
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  //Se llama el modal de eliminar
  $("#eliminar").modal("show");
};

window.generarReporteTipoAcabado = async (tipo_acabado_ID, nombre_tipo_acabado) => { 
  let tableContent = ""
  let apiEndpoint = API_REPORTES + "propiedad_tipo_acabado"
  let parameters = new FormData()
  parameters.append("id_tipo_acabado", tipo_acabado_ID)
  let obetenerTipoAcabadoRespuesta = await APIConnection(apiEndpoint, POST_METHOD, parameters)
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

  
  obetenerTipoAcabadoRespuesta.dataset.forEach(element => { 
    tableContent += `
          <tr>
      <td>${element.codigo}</td>
       <td>${element.nombre_tipo}</td>
      <td>${element.departamento}</td>
      <td>${element.municipio}</td>
      <td>${element.direccion}</td>
      <td>${element.apellido}</td>
      <td>${element.nombre}</td>
      <td>${element.precio}</td>
      </tr>
    `
  } )

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
                  <th>Codigo</th>
                    <th>Material</th>
                    <th>Departamento</th>
                    <th>Municipio</th>
                    <th>Direccion</th>
                    <th>Apellido</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                  </tr>
              </thead>
              <tbody>
                  ${tableContent}
              </tbody>
          </table>
          <div class="container-fluid" id="tabla-footer">
              <a class="text-footer">MUNEG S.A C.V</a>
          </div>
      </div>
      </main>
  
  </body>
  
  </html>`;
  await generatePDF(generatedHTML, nombre_tipo_acabado + "_nombre_tipo_acabado" + ".pdf")



}

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busquedagetElementById("search-bar")
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_GESTION_ACABADO, "search-bar", fillTablePropietario);
});  

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("insert_form"));
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow( API_GESTION_ACABADO, API_CREATE, parameters, fillTableGestionAcabado );
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
});

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("update_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("visibilidad", datos_gestion_acabado.visibilidad);
  parameters.append("id_tipo_acabado", datos_gestion_acabado.id_gestion_acabado);
  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await saveRow( API_GESTION_ACABADO, API_UPDATE, parameters, fillTableGestionAcabado );
  // Se cierra el formulario de registro

  // reinicia el crud
  getElementById("verDatosliminados").checked = false
  getElementById('textoSwitch').innerHTML = "Hacer invisible"
  isWatchinDeletedData = false
  $("#actualizar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al delete
  parameters.append("id_tipo_acabado", datos_gestion_acabado.id_gestion_acabado);
  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await deleteRow( API_GESTION_ACABADO, parameters, fillTableGestionAcabado );
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});
