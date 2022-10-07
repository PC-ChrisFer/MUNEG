//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { generatePDF, obtenerFechaActual } from "../../components.js";
import { POST_METHOD, SERVER, GET_METHOD } from "../../constants/api_constant.js";
import { getElementById, showModal } from "../../constants/helpers.js";
import { graphPieFacturaInquilino } from "./fills.js";

const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';

export let datos_factura = {
  id: 0,
  codigo_factura: " ",
  descripcion: " ",
  direccion: " ",
  subtotal: " ",
  IVA: " ",
  venta_gravada: " ",
  fecha: " ",
  id_inquilino: " ",
};

let datos_inquilino = {
  id_inquilino: 0,
  nombre: " ",
};

window.seleccionarInquilino = () => {
  datos_inquilino.id_inquilino = getElementById("id_inquilino").value;
};

//Función para guardar los datos cambiados en el combobox
window.selectInquilino = (id_inquilino) => {
  datos_factura.id_inquilino = document.getElementById(id_inquilino).value;
};

// FUNCION PARA GUARDAR LOS DATOS DEL CATEGORIA
window.guardarDatosUpdate = (
  id_factura,
  codigo_factura,
  descripcion,
  direccion,
  subtotal,
  IVA,
  venta_gravada,
  fecha,
  inquilino
) => {
  //Se transfieren los datos del boton al json global
  datos_factura.id = id_factura;
  //Desarrollando los select
  getElementById("codigo_factura_update").value = String(codigo_factura);
  getElementById("descripcion_update").value = String(descripcion);
  getElementById("direccion_update").value = String(direccion);
  getElementById("subtotal_update").value = String(subtotal);
  getElementById("IVA_update").value = String(IVA);
  getElementById("venta_gravada_update").value = String(venta_gravada);
  getElementById("fecha_emision_update").value = String(fecha);
  getElementById("id_inquilino_update").value = String(inquilino);

  showModal("#actualizar")
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_factura) => {
  datos_factura.id = id_factura;
  showModal("#eliminar");
};

//Funcion para generar grafico a traves del click de un boton
window.generarGrafico = async () => {
  await graphPieFacturaInquilino(datos_factura.id_inquilino);
};

//CREACIÓN DEL PDF
window.generarReporteFactura = async (id_factura) => {
  let tableContent = "";
  let apiEndpoint = API_REPORTES + "factura";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";

  let parameters = new FormData();
  parameters.append("id_factura", id_factura);
  let obetenerFacturaRespuesta = await APIConnection(
    apiEndpoint,
    POST_METHOD,
    parameters
  );

  let ObtenerUsuarioActualResponse = await APIConnection(
    APIEndpointObtenerUsuarioActual,
    GET_METHOD,
    null
  );

  obetenerFacturaRespuesta.dataset.forEach((element) => {
    tableContent += `
          <tr>
      <td>${element.codigo_factura}</td>
       <td>${element.descripcion}</td>
      <td>${element.subtotal}</td>
      <td>${element.IVA}</td>
      <td>${element.venta_gravada}</td>
      <td>${element.fecha}</td>
      <td>${element.nombre} ${element.apellido} </td>
      </tr>
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
              <a>FACTURA</a>
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
                    <th>Descripción</th>
                    <th>SubTotal</th>
                    <th>IVA</th>
                    <th>Venta gravada</th>
                    <th>Fecha de Creación</th>
                    <th>Nombre Completo</th>
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
  await generatePDF(generatedHTML, "factura_" + id_factura + ".pdf");

  window.open("../../api/reporte/" + "factura_" + id_factura + ".pdf");
};

//Reporte de mes//
window.abrirModalReportes = () => {
  showModal("#reportes");
};

window.generarReporteFacturaMes = async () => {
  //contenido de la tabla
  let tableContent = "";
  // enpoints que vas a utilizar
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";
  let enpointReporte = API_REPORTES + "factura_mes";
  // instancia para ingresar parametros
  let parameters = new FormData();
  parameters.append("fecha_factura", getElementById("meses_año").value);

  //Consultas que vas a hacer
  let obtenerDatosParaReporteFacturaMes = await APIConnection(
    enpointReporte,
    POST_METHOD,
    parameters
  );
  let ObtenerUsuarioActualResponse = await APIConnection(
    APIEndpointObtenerUsuarioActual,
    GET_METHOD,
    null
  );

  tableContent = `
      <tr>
      <td>${obtenerDatosParaReporteFacturaMes.dataset.codigo_factura}</td>
      <td>${obtenerDatosParaReporteFacturaMes.dataset.descripcion}</td>
     <td>${obtenerDatosParaReporteFacturaMes.dataset.subtotal}</td>
     <td>${obtenerDatosParaReporteFacturaMes.dataset.IVA}</td>
     <td>${obtenerDatosParaReporteFacturaMes.dataset.venta_gravada}</td>
     <td>${obtenerDatosParaReporteFacturaMes.dataset.fecha}</td>
     <td>${obtenerDatosParaReporteFacturaMes.dataset.nombre} ${obtenerDatosParaReporteFacturaMes.dataset.apellido}</td>
     </tr>
    `;

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
              <a>FACTURAS EFECTUADAS EN EL MES</a>
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
                  <th>Descripción</th>
                  <th>SubTotal</th>
                  <th>IVA</th>
                  <th>Venta gravada</th>
                  <th>Fecha de Creación</th>
                  <th>Nombre Completo</th>
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

  await generatePDF(
    generatedHTML,
    getElementById("meses_año").value + "facturas" + ".pdf"
  );
  window.open(
    "../../api/reporte/" +
      getElementById("meses_año").value +
      "facturas" +
      ".pdf"
  );
};
