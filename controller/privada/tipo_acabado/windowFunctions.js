//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { readRows, readDeletedRowns, obtenerFechaActual, generatePDF } from "../../components.js";
import { SERVER, POST_METHOD, GET_METHOD } from "../../constants/api_constant.js";
import { getElementById, showModal, uncheckButton } from "../../constants/helpers.js";
import { fillTableGestionAcabado } from "./fill.js";

const API_GESTION_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";


export let datos_gestion_acabado = {
    id_gestion_acabado: "",
    nombre_gestion_acabado: "",
    visibilidad: true,
};

let isWatchinDeletedData = false

window.leerDatosEliminados = async () => {
    if (getElementById("verDatosliminados").checked === true) {
        await readDeletedRowns(API_GESTION_ACABADO, fillTableGestionAcabado)
        isWatchinDeletedData = true
    } else {
        await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);
        isWatchinDeletedData = false
    }
    getElementById("verDatosliminados").checked === true ? getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
};

window.cambiarVisibilidadDeResgistro = () => {
    if (isWatchinDeletedData) {
        getElementById("eliminarElemento").checked === true ?
            (datos_gestion_acabado.visibilidad = true) :
            (datos_gestion_acabado.visibilidad = false);

    } else {
        getElementById("eliminarElemento").checked === true ?
            (datos_gestion_acabado.visibilidad = false) :
            (datos_gestion_acabado.visibilidad = true);
    }
};

//Función para cargar los datos del update
window.guardarDatosUpdate = ( id_gestion_acabado, visibilidad, nombre_tipo_acabado ) => {

    datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
    datos_gestion_acabado.visibilidad = visibilidad;
    //Se imprime la información en el modal
    getElementById("tipo_acabado_update").value = String(nombre_tipo_acabado);
   
    uncheckButton("eliminarElemento")
    showModal("#actualizar")
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_gestion_acabado) => {
    //Se transfieren los datos del boton al json global  
    datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;

    showModal("#eliminar")
};

window.cambiarEstadoGestionAcabado = () => {
    datos_gestion_acabado.visibilidad = !datos_gestion_acabado.visibilidad;

    getElementById("visibilidad").value = datos_gestion_acabado.visibilidad ?
        "visible" :
        "invisible";
};

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
            <td>${element.nombre_tipo}</td>
            <td>${element.departamento}</td>
            <td>${element.municipio}</td>
            <td>${element.direccion}</td>
            <td>${element.apellido}</td>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
         </tr>`
    })

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
              <a>MUNEG S.A C.V</a>
          </div>
      </div>
      </main>
  
  </body>
  
  </html>`;
  await generatePDF(generatedHTML, nombre_tipo_acabado + "_nombre_tipo_acabado" + ".pdf")

    window.open("../../api/reporte/" + nombre_tipo_acabado + "_nombre_tipo_acabado" + ".pdf");
}

export function resetIsWatchingDeletedData() {
    isWatchinDeletedData = false;
}