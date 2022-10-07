//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { getElementById, showModal } from "../../constants/helpers.js";
import { graphBarContrato } from "./graphics.js";
import {
  POST_METHOD,
  SERVER,
  GET_METHOD,
} from "../../constants/api_constant.js";
import { generatePDF, obtenerFechaActual } from "../../components.js";

const API_USUARIO = SERVER + "privada/usuario.php?action=";
const API_REPORTE = SERVER + "privada/pdf.php?action=";

export let datos_contrato = {
  id: 0,
  descripcion: " ",
  fecha_firma: " ",
  fecha_firma_final: " ",
  imagen: " ",
  id_propietario: " ",
  id_propiedad: " ",
  id_empleado: " ",
  id_inquilino: " ",
  imagen:""
};

let datos_propietario = {
  id_propietario: 0,
  nombre: " ",
};

export let datos_propiedad = {
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

//Función para guardar los datos cambiados en el combobox
window.seleccionarPropietario = () => {
  datos_propietario.id_propietario = getElementById("id_propietario").value;
};

//Función para guardar los datos cambiados en el combobox
window.seleccionarPropiedad = () => {
  datos_propiedad.id_propiedad = getElementById("id_propiedad").value;
};

//Función para guardar los datos cambiados en el combobox
window.seleccionarEmpleado = () => {
  datos_empleado.id_empleado = getElementById("id_empleado").value;
};

//Función para guardar los datos cambiados en el combobox
window.seleccionarInquilino = () => {
  datos_inquilino.id_inquilino = getElementById("id_inquilino").value;
};

//Función para cargar los datos del update
window.guardaDatosUpdate = (
  id_contrato,
  descripcion,
  fecha_firma,
  id_propietario,
  id_propiedad,
  id_empleado,
  id_inquilino,
  imagen
) => {
  //Se transfieren los datos del boton al json global
  datos_contrato.id = id_contrato;
  //Se llama el modal de actualizar
  showModal("#actualizar")
  //Se imprime la información en el modal
  getElementById("descripcion_update").value = String(descripcion);
  getElementById("fecha_firma_update").value = String(fecha_firma);
  getElementById("id_propietario_update").value = String(id_propietario);
  getElementById("id_propiedad_update").value = String(id_propiedad);
  getElementById("id_empleado_update").value = String(id_empleado);
  getElementById("id_inquilino_update").value = String(id_inquilino);
  datos_contrato.imagen = imagen
};

//Función para cargar el id para el delete
window.guardaDatosDelete = (id_contrato) => {
  datos_contrato.id = id_contrato;
  showModal("#eliminar")
};

//Funcion para generar grafico a traves del click de un boton
window.generarGrafico = async () => {
  datos_contrato.fecha_firma = getElementById("fecha_firma_inicial").value;
  datos_contrato.fecha_firma_final = getElementById("fecha_firma_final").value;
  await graphBarContrato(
    datos_contrato.fecha_firma,
    datos_contrato.fecha_firma_final
  );
};

//CREACIÓN DE PDF
window.createContratoOrdenPDF = async () => {
  let APIEnpointReadContrato = API_REPORTE + "contratos_orden";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";

  let readContratoResponse = await APIConnection(
    APIEnpointReadContrato,
    POST_METHOD
  );
  let ObtenerUsuarioActualResponse = await APIConnection(
    APIEndpointObtenerUsuarioActual,
    GET_METHOD,
    null
  );

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
  await generatePDF(generatedHTML, "contratos_fecha" + ".pdf");

  window.open("../../api/reporte/" + "contratos_fecha" + ".pdf");
};
