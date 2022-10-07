//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { obtenerFechaActual, generatePDF } from "../../components.js";
import {
  GET_METHOD,
  POST_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import { getElementById, showModal } from "../../constants/helpers.js";

const API_USUARIO = SERVER + "privada/usuario.php?action=";
const API_REPORTE = SERVER + "privada/pdf.php?action=";

export let datos_reporte = {
  id_reporte: "",
  asunto: "",
  descripcion: "",
  estado: true,
  id_inquilino: "",
  imagen: "",
};

window.seleccionarInquilino = () => {
  datos_reporte.id_inquilino = document.getElementById("inquilinos").value;
};

// FUNCION PARA ACTUALIZAR

window.guardarDatosUpdate = (
  id_reporte,
  asunto,
  descripcion,
  id_inquilino,
  estado,
  imagen
) => {
  datos_reporte.id_reporte = id_reporte;
  datos_reporte.id_inquilino = id_inquilino;
  datos_reporte.estado = estado;
  datos_reporte.imagen = imagen;
  getElementById("asunto_update").value = asunto;
  getElementById("descripcion_update").value = descripcion;

  showModal("#actualizar");
};

window.cambiarEstadoReporte = () => {
  datos_reporte.estado = !datos_reporte.estado;

  getElementById("switchButton").value = datos_reporte.estado
    ? "activo"
    : "inactivo";
};

// FUNCION PARA ELIMINAR

window.guardarDatosDelete = (id_reporte) => {
  datos_reporte.id_reporte = id_reporte;

  showModal("#eliminar");
};

//CREACIÓN DE PDF
window.createReporteReportesPDF = async () => {
  let APIEnpointReadReportes = API_REPORTE + "reportes_orden";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";

  let readReportesResponse = await APIConnection(
    APIEnpointReadReportes,
    POST_METHOD
  );
  let ObtenerUsuarioActualResponse = await APIConnection(
    APIEndpointObtenerUsuarioActual,
    GET_METHOD,
    null
  );

  let tableContent = ``;

  readReportesResponse.dataset.forEach((element) => {
    tableContent += `
        <tr>
        <td>${element.id_reporte}</td>
        <td>${element.asunto}</td>
        <td>${element.descripcion}</td>
        <td>${element.estado}</td>
        <td>${element.nombre}</td>
        <tr> `;
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
  await generatePDF(generatedHTML, "reportes_orden" + ".pdf");

  window.open("../../api/reporte/" + "reportes_orden" + ".pdf");
};
