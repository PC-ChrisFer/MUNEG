//@ts-check

import { APIConnection } from "../APIConnection.js";
import { deleteRow, readRows, saveRow,generatePDF,obtenerFechaActual } from "../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
  POST_METHOD
} from "../constants/api_constant.js";
import { getElementById,  validateExistenceOfUser } from "../constants/functions.js";

const API_GESTION_TIPO_PROPIEDAD =
  SERVER + "privada/tipo_propiedad.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action="
const API_USUARIO = SERVER + 'privada/usuario.php?action=';

let datos_tipoPropiedad = {
  id_tipo_propiedad: "",
  nombre_tipo_propiedad: "",
  visibilidad: true,
  id_categoria: "",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
  await fillCategoriaCombobox("listado_categorias_id");
  await fillCategoriaCombobox("listado_categorias_id_u");
});

async function fillCategoriaCombobox(fieldID) {
  let APIEndpoint = API_GESTION_TIPO_PROPIEDAD + "readAllCategorias";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        fieldID
      ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
    });
    return;
  }
  console.log("all bad");
}

function fillTableTipoPropiedad(dataset) {
  let content = "";
  console.log(dataset);
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
             <tr>
             <td>${row.nombre_tipo}</td>
             <td>${row.visibilidad}</td>
             <td class="d-flex justify-content-center">
             <a onclick="guardarDatosUpdate(${row.id_tipo_propiedad},${row.visibilidad},'${row.nombre_tipo}')" class="btn" id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_propiedad})" class="btn" id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                    <a onclick="generarReporteTipoPropiedad(${row.id_tipo_propiedad})" class="btn" id="button_ver_mas">Generar Reporte</a>
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-tipo-propiedad").innerHTML = content;
}

//@ts-ignore
window.selectIdCategoria = (idCategoriaCmb) => {
  //@ts-ignore
  datos_tipoPropiedad.id_categoria = getElementById(idCategoriaCmb).value;
};

//@ts-ignore
window.generarReporteTipoPropiedad = async (idTipoPropiedad) => { 
  let tableContent = ""
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';
  let ApiEndpoint = API_REPORTES + "propiedad_tipo_propiedad"
  
  let parameters = new FormData()
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);
  parameters.append("id_tipo_propiedad",idTipoPropiedad)
  let obtenerTipoPropiedadReporte = await APIConnection(ApiEndpoint, POST_METHOD, parameters) 
  console.log(obtenerTipoPropiedadReporte)

  //Iterando sobre elementos de array
  obtenerTipoPropiedadReporte.dataset.forEach(element => { 
    tableContent += `
     <tr>
      <td>${element.apellido}</td>
       <td>${element.codigo}</td>
             <td>${element.departamento}</td>
       <td>${element.direccion}</td>
           <td>${element.municipio}</td>
       <td>${element.nombre}</td>
             <td>${element.nombre_tipo}</td>
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
  console.log("TEST")

  console.log(idTipoPropiedad+ "_TipoPropiedad" + ".pdf")
 await generatePDF(generatedHTML,  idTipoPropiedad+ "_TipoPropiedad" + ".pdf")

}

//@ts-ignore
window.guardarDatosUpdate = async (
  id_tipoPropiedad,
  visibilidad,
  nombre_tipo_propiedad
) => {
  datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
  datos_tipoPropiedad.visibilidad = visibilidad;

  //@ts-ignore
  getElementById("tipo_propiedad_update").value = String(nombre_tipo_propiedad);

  //@ts-ignore
  getElementById("switchButton").value = datos_tipoPropiedad.visibilidad
    ? "visible"
    : "invisible";

  //@ts-ignore
  $("#actualizar").modal("show");
};

//@ts-ignore
window.guardarDatosDelete = (id_tipoPropiedad) => {
  datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
  //@ts-ignore
  $("#eliminar").modal("show");
};

//@ts-ignore
window.cambiarEstadoTipoPropiedad = () => {
  datos_tipoPropiedad.visibilidad = !datos_tipoPropiedad.visibilidad;
  // @ts-ignore
  getElementById("switchButton").value = datos_tipoPropiedad.visibilidad
    ? "visible"
    : "invisible";
};

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("insert_form"));
  parameters.append("categoria", datos_tipoPropiedad.id_categoria);

  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_CREATE,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("visibilidad", datos_tipoPropiedad.visibilidad);
  parameters.append("id_tipo_propiedad", datos_tipoPropiedad.id_tipo_propiedad);
  parameters.append("categoria", datos_tipoPropiedad.id_categoria);

  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_UPDATE,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#actualizar").modal("hide");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id_tipo_propidad", datos_tipoPropiedad.id_tipo_propiedad);

  await deleteRow(
    API_GESTION_TIPO_PROPIEDAD,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#eliminar").modal("hide");
});
