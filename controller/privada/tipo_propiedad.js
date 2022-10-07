//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "../APIConnection.js";
import {
  deleteRow,
  readRows,
  saveRow,
  readDeletedRowns,
  searchRows,
  obtenerFechaActual,
  generatePDF,
} from "../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
  POST_METHOD,
} from "../constants/api_constant.js";
import { getElementById } from "../constants/helpers.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { inactivityTime } from "../soporte/soporte.js";


//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_TIPO_PROPIEDAD =
  SERVER + "privada/tipo_propiedad.php?action=";
//SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
let datos_tipoPropiedad = {
  id_tipo_propiedad: "",
  id_tipo_acabado: 0,
  nombre_tipo_propiedad: "",
  visibilidad: true,
  id_categoria: "",
};

// array para obtener los tipos de propiedad
let IDsTiposPropiedad = [];

let isWatchinDeletedData = false;

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
  //Cargar combo box de categoria
  await fillCategoriaCombobox("listado_categorias_id");
  //Cargar combo box de categoria
  await fillCategoriaCombobox("listado_categorias_id_u");

  getElementById("textoSwitch").innerHTML = "Hacer invisible";
  inactivityTime();
});

//Obtener los datos de combobox categoria
async function fillCategoriaCombobox(fieldID) {
  //Se crea un endpoint especifico para el caso de leer categoria
  let APIEndpoint = API_GESTION_TIPO_PROPIEDAD + "readAllCategorias";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        fieldID
      ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
    });
    return;
  }
}

//Metodo para llenar las tablas de datos, utiliza la función readRows()
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
             <a onclick="guardarDatosUpdate(${row.id_tipo_propiedad},${row.visibilidad},'${row.nombre_tipo}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_propiedad})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                    <a onclick="generarReporteTipoPropiedad(${row.id_tipo_propiedad})" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">Generar Reporte</a>
         </td>
         </tr>
        `;

        IDsTiposPropiedad.push(row.id_tipo_propiedad)
  });
  //Se inserta las información de la tabla a un elemento html
  getElementById("tbody-tipo-propiedad").innerHTML = content;
}

//Función para cambiar la visibilidad con un checkbox
window.selectIdCategoria = (idCategoriaCmb) => {
  datos_tipoPropiedad.id_categoria = getElementById(idCategoriaCmb).value;
};

// FUNCION PARA GUARDAR LOS DATOS TIPO PROPIEDAD
window.guardarDatosUpdate = async (
  id_tipoPropiedad,
  visibilidad,
  nombre_tipo_propiedad,
  id_categoria
) => {
  //Se transfieren los datos del boton al json global
  datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
  datos_tipoPropiedad.visibilidad = visibilidad;
  datos_tipoPropiedad.id_categoria = id_categoria;
  //Se imprime la información en el modal
  getElementById("tipo_propiedad_update").value = String(nombre_tipo_propiedad);
  getElementById("listado_categorias_id_u").value = String(id_categoria);
  getElementById("eliminarElemento").checked = false;

  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_tipoPropiedad) => {
  //Se transfieren los datos del boton al json global
  datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
  //Se llama el modal de eliminar
  $("#eliminar").modal("show");
};

window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
    isWatchinDeletedData = true;
  } else {
    await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
    isWatchinDeletedData = false;
  }
  getElementById("verDatosliminados").checked === true
    ? (getElementById("textoSwitch").innerHTML = "Hacer visible")
    : (getElementById("textoSwitch").innerHTML = "Hacer invisible");
};

window.cambiarVisibilidadDeResgistro = () => {
  if (isWatchinDeletedData) {
    getElementById("eliminarElemento").checked === true
      ? (datos_tipoPropiedad.visibilidad = true)
      : (datos_tipoPropiedad.visibilidad = false);
  } else {
    getElementById("eliminarElemento").checked === true
      ? (datos_tipoPropiedad.visibilidad = false)
      : (datos_tipoPropiedad.visibilidad = true);
  }
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(
    API_GESTION_TIPO_PROPIEDAD,
    "search-bar",
    fillTableTipoInquilino
  );
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert_form'"
  let parameters = new FormData(getElementById("insert_form"));
  // Se adhieren datos al arreglo que se envia al insert
  parameters.append("categoria", datos_tipoPropiedad.id_categoria);
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_CREATE,
    parameters,
    fillTableTipoPropiedad
  );
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
});

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "update_form'"
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("visibilidad", datos_tipoPropiedad.visibilidad);
  parameters.append("id_tipo_propiedad", datos_tipoPropiedad.id_tipo_propiedad);
  parameters.append("categoria", datos_tipoPropiedad.id_categoria);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_UPDATE,
    parameters,
    fillTableTipoPropiedad
  );

  // reinicia el crud
  getElementById("verDatosliminados").checked = false;
  getElementById("textoSwitch").innerHTML = "Hacer invisible";
  isWatchinDeletedData = false;

  // Se cierra el formulario de registro
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
  parameters.append("id_tipo_propidad", datos_tipoPropiedad.id_tipo_propiedad);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(
    API_GESTION_TIPO_PROPIEDAD,
    parameters,
    fillTableTipoPropiedad
  );
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});

//Generar Reportes
//@ts-ignore
// FUNCION PARA GUARDAR LOS DATOS TIPO PROPIEDAD
window.generarReporteTipoPropiedad = async (idTipoPropiedad) => {
  let tableContent = "";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";
  let ApiEndpoint = API_REPORTES + "propiedad_tipo_propiedad";

    let parameters = new FormData();
    let ObtenerUsuarioActualResponse = await APIConnection(
      APIEndpointObtenerUsuarioActual,
      GET_METHOD,
      null
    );
    parameters.append("id_tipo_propiedad", idTipoPropiedad);
    let obtenerTipoPropiedadReporte = await APIConnection(
      ApiEndpoint,
      POST_METHOD,
      parameters
    );
    //Iterando sobre elementos de array
    obtenerTipoPropiedadReporte.dataset.forEach((element) => {
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
    await generatePDF(
      generatedHTML,
      idTipoPropiedad + "_TipoPropiedad" + ".pdf"
    );
    window.open(
      "../../api/reporte/" + idTipoPropiedad + "_TipoPropiedad" + ".pdf"
    );

};
