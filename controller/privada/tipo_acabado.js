//@ts-check
<<<<<<< Updated upstream
=======
//Importar las constantes y metodos de components.js y api_constant.js
import { deleteRow, readRows, saveRow, readDeletedRowns, generatePDF, obtenerFechaActual } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE, POST_METHOD, GET_METHOD } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";
>>>>>>> Stashed changes

import { deleteRow, readRows, saveRow } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE } from "../constants/api_constant.js";
import { getElementById,  validateExistenceOfUser } from "../constants/functions.js";

const API_GESTION_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
<<<<<<< Updated upstream
=======
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';

>>>>>>> Stashed changes

let datos_gestion_acabado = {
  id_gestion_acabado: "",
  nombre_gestion_acabado: "",
  visibilidad: true,
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);
  await validateExistenceOfUser();

});

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
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-tipo-acabado").innerHTML = content;
}

//@ts-ignore
window.guardarDatosUpdate = (
  id_gestion_acabado,
  visibilidad,
  nombre_tipo_acabado
) => {
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  datos_gestion_acabado.visibilidad = visibilidad;

  //@ts-ignore
  getElementById("tipo_acabado_update").value = String(nombre_tipo_acabado);

  //@ts-ignore
  getElementById("visibilidad").value = datos_gestion_acabado.visibilidad
    ? "visible"
    : "invisible";
  //@ts-ignore
  $("#actualizar").modal("show");
};

//@ts-ignore
window.guardarDatosDelete = (id_gestion_acabado) => {
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  //@ts-ignore
  $("#eliminar").modal("show");
};

<<<<<<< Updated upstream
//@ts-ignore
window.cambiarEstadoGestionAcabado = () => {
  datos_gestion_acabado.visibilidad = !datos_gestion_acabado.visibilidad;
  // @ts-ignore
  getElementById("visibilidad").value = datos_gestion_acabado.visibilidad
    ? "visible"
    : "invisible";
};
=======
window.generarReporteTipoAcabado = async (tipo_acabado_ID, nombre_tipo_acabado) => { 
  let tableContent = ""
  let apiEndpoint = API_REPORTES + "propiedad_tipo_acabado"
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';

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
>>>>>>> Stashed changes

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("insert_form"));

  await saveRow(
    API_GESTION_ACABADO,
    API_CREATE,
    parameters,
    fillTableGestionAcabado
  );

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("visibilidad", datos_gestion_acabado.visibilidad);
  //@ts-ignore
  parameters.append(
    "id_tipo_acabado",
    datos_gestion_acabado.id_gestion_acabado
  );

  await saveRow(
    API_GESTION_ACABADO,
    API_UPDATE,
    parameters,
    fillTableGestionAcabado
  );

  // @ts-ignore
  $("#actualizar").modal("hide");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData();
  //@ts-ignore
  parameters.append(
    "id_tipo_acabado",
    datos_gestion_acabado.id_gestion_acabado
  );

  await deleteRow(API_GESTION_ACABADO, parameters, fillTableGestionAcabado);

  // @ts-ignore
  $("#eliminar").modal("hide");
});
