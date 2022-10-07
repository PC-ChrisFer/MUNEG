//@ts-check

import { APIConnection } from "../../APIConnection.js";
import { generatePDF, obtenerFechaActual } from "../../components.js";
import {
  GET_METHOD,
  POST_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import { getElementById, showModal } from "../../constants/helpers.js";

const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

export let datos_propietario = {
  id: 0,
  nombre: " ",
  apellido: " ",
  numero_telefono: " ",
  correo_electronico: " ",
  fecha_nacimiento: " ",
  genero: " ",
  DUI: " ",
  imagen: " ",
  id_tipo_propietario: " ",
};

let datos_tipo_propietario = {
  id_tipo_propietario: " ",
  nombre_tipo: " ",
};

window.seleccionarTipoPropietario = () => {
  datos_tipo_propietario.id_tipo_propietario = getElementById(
    "id_tipo_propietario"
  ).value;
};

window.guardarDatosPropietarioUpdate = (
  id_propietario,
  nombre,
  apellido,
  numero_telefono,
  correo_electronico,
  fecha_nacimiento,
  genero,
  DUI,
  id_tipo_propietario,
  imagen
) => {
  datos_propietario.id = id_propietario;

  // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
  //EL ATRIBUTO "value="""
  //@ts-ignore
  getElementById("nombre_update").value = String(nombre);
  getElementById("apellido_update").value = String(apellido);
  getElementById("telefono_update").value = String(numero_telefono);
  getElementById("correo_electronico_update").value =
    String(correo_electronico);
  getElementById("fecha_nacimiento_update").value = String(fecha_nacimiento);
  getElementById("genero_update").value = String(genero);
  getElementById("DUI_update").value = String(DUI);
  getElementById("id_tipo_propietario_update").value =
    String(id_tipo_propietario);

  datos_propietario.imagen = imagen;
  showModal("#actualizar");
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosPropietarioDelete = (id_propietario) => {
  datos_propietario.id = id_propietario;
  showModal("#eliminar");
};

window.abrirModalReportes = () => {
  showModal("#reportes");
};

//CREACIÓN DE PDF
window.createPropietarioPDF = async () => {
  let APIEnpointReadPropietario = API_REPORTES + "propietario_tipo_propietario";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";
  let parameters = new FormData();

  parameters.append(
    "id_tipo_propietario",
    getElementById("id_tipo_propietario").value
  );

  let readPropietarioResponse = await APIConnection(
    APIEnpointReadPropietario,
    POST_METHOD,
    parameters
  );
  let ObtenerUsuarioActualResponse = await APIConnection(
    APIEndpointObtenerUsuarioActual,
    GET_METHOD,
    null
  );

  let tableContent = ``;

  readPropietarioResponse.dataset.forEach((element) => {
    tableContent += `
    <tr>
    <td>${element.nombre_tipo}</td>
    <td>${element.nombre} ${element.apellido}</td>
    <td>${element.correo_electronico}</td>
    <td>${element.fecha_nacimiento}</td>
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
                <a>PROPIETARIOS SEGÚN EL TIPO DE PROPIETARIO</a>
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
                        <th>Tipo de Propietario</th>
                        <th>Nombre del Propietario</th>
                        <th>Correo Electrónico</th>
                        <th>Fecha de Nacimiento</th>
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
    +getElementById("id_tipo_propietario").value + "tipo_propietario" + ".pdf"
  );

  window.open(
    "../../api/reporte/" +
      getElementById("id_tipo_propietario").value +
      "tipo_propietario" +
      ".pdf"
  );
};
