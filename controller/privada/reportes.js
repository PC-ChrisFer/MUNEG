//@ts-check
import { APIConnection } from "../APIConnection.js";
import { deleteRow, obtenerFechaActual, readRows, saveRow, searchRows, generatePDF } from "../components.js";
import {
  API_CREATE,
  API_UPDATE,
  GET_METHOD,
  POST_METHOD,
  SERVER,
} from "../constants/api_constant.js";
import { getElementById,  validateExistenceOfUser } from "../constants/helpers.js";
import { inactivityTime } from "../soporte/soporte.js";

const API_REPORTES = SERVER + "privada/reporte.php?action=";
const API_INQUILINOS = SERVER + "privada/inquilino.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';
const API_REPORTE = SERVER + "privada/pdf.php?action=";


let datos_reporte = {
  id_reporte: "",
  asunto: "",
  descripcion: "",
  estado: true,
  id_inquilino: "",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
   await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_REPORTES, fillTableReportes);
  await fillInquilinosComboBox();
  inactivityTime();
});

function fillTableReportes(dataset) {
  let content = "";
  console.log(dataset)
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
        <tr>
            <td>${row.id_reporte}</td>
            <td>${row.asunto}</td>
            <td>${row.descripcion}</td>
            <td><img src="../../api/imagenes/reporte/${row.imagen}" width="50%" height="50%"></td>
            <td class="d-flex justify-content-center">
                <a onclick="guardarDatosUpdate(${row.id_reporte},'${row.asunto}','${row.descripcion}', '${row.id_inquilino}','${row.estado}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                  <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                <a onclick="guardarDatosDelete(${row.id_reporte})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
                  <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
            </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-reportes").innerHTML = content;
}

async function fillInquilinosComboBox() {
  let APIEndpoint = API_INQUILINOS + "readAll";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  console.log(APIResponse);
  APIResponse.dataset.map((element) => {
    //@ts-ignore
    getElementById(
      "inquilinos"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;

    //@ts-ignore
    getElementById(
      "inquilinos_u"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
}


//@ts-ignore
window.seleccionarInquilino = () => {
  //@ts-ignore
  datos_reporte.id_inquilino = document.getElementById("inquilinos").value;
};

// FUNCION PARA ACTUALIZAR
// @ts-ignore
window.guardarDatosUpdate = (
  id_reporte,
  asunto,
  descripcion,
  id_inquilino,
  estado
) => {
  datos_reporte.id_reporte = id_reporte;
  datos_reporte.id_inquilino = id_inquilino;
  datos_reporte.estado = estado;
  //@ts-ignore
  getElementById("asunto_update").value = asunto;
  //@ts-ignore
  getElementById("descripcion_update").value = descripcion;
  //@ts-ignore
  getElementById("switchButton").value = estado ? "activo" : "inactivo";

  // @ts-ignore
  $("#actualizar").modal("show");
};

// @ts-ignore
window.cambiarEstadoReporte = () => {
  datos_reporte.estado = !datos_reporte.estado;
  // @ts-ignore
  getElementById("switchButton").value = datos_reporte.estado
    ? "activo"
    : "inactivo";
};

// FUNCION PARA ELIMINAR
// @ts-ignore
window.guardarDatosDelete = (id_reporte) => {
  datos_reporte.id_reporte = id_reporte;
  // @ts-ignore
  $("#eliminar").modal("show");
};

// Método que se ejecuta al enviar un formulario de busqueda
  // @ts-ignore
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_REPORTES, "search-bar", fillTableReportes);
});

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  // @ts-ignore
  let parameters = new FormData(getElementById("insert_form"));
  //@ts-ignore
  parameters.append("inquilino", datos_reporte.id_inquilino);
  //@ts-ignore
  parameters.append("estado", true);

  await saveRow(API_REPORTES, API_CREATE, parameters, fillTableReportes);

  // @ts-ignore
  $("#agregar").modal("hide");
});

// ACTUALIZAR REPORTE
getElementById("form_update")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // @ts-ignore
  let parameters = new FormData(getElementById("form_update"));
  //@ts-ignore
  parameters.append("reporte_id", datos_reporte.id_reporte);
  //@ts-ignore
  parameters.append("estado_update", datos_reporte.estado);
  parameters.append("inquilino_update", datos_reporte.id_inquilino);



  // API REQUEST
  await saveRow(API_REPORTES, API_UPDATE, parameters, fillTableReportes);
    //@ts-ignore
  $("#actualizar").modal("hide");

});

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // pendiente a inquilinos
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id_reporte", datos_reporte.id_reporte);

  await deleteRow(API_REPORTES, parameters, fillTableReportes);

  // @ts-ignore
  $("#eliminar").modal("hide");
})


//CREACIÓN DE PDF
window.createReporteReportesPDF = async () => {
  let APIEnpointReadReportes = API_REPORTE + "reportes_orden";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';

  let readReportesResponse = await APIConnection(APIEnpointReadReportes, POST_METHOD);
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

  let tableContent = ``;

  readReportesResponse.dataset.forEach((element) => {
      tableContent += `
  <tr>
  <td>${element.id_reporte}</td>
  <td>${element.asunto}</td>
  <td>${element.descripcion}</td>
  <td>${element.estado}</td>
  <td>${element.nombre}</td>
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
              <a>REPORTES POR ORDEN DE CREACION</a>
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
                      <th>Numero de Reporte</th>
                      <th>Asunto</th>
                      <th>Descripción</th>
                      <th>Estado</th>
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
  let res = await generatePDF(generatedHTML, "reportes_orden" + ".pdf")

  window.open("../../api/reporte/" + "reportes_orden" + ".pdf");
}

