//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "../APIConnection.js";
import { deleteRow, readRows, saveRow, searchRows, readDeletedRowns } from "../components.js";
import { API_CREATE, API_UPDATE, GET_METHOD, SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_REPORTES = SERVER + "privada/reporte.php?action=";
const API_INQUILINOS = SERVER + "privada/inquilino.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
let datos_reporte = {
  id_reporte: "",
  asunto: "",
  descripcion: "",
  estado: true,
  id_inquilino: "",
  imagen: "",
  visibilidad:true
}
let isWatchinDeletedData = false

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_REPORTES, fillTableReportes);
  //Se llama las funciones de combobox de inquilino
  await fillInquilinosComboBox();

  getElementById('textoSwitch').innerHTML = "Hacer invisible"
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
function fillTableReportes(dataset) {
  //Se define el contenido html
  let content = ` `;
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
                <a onclick="guardarDatosUpdate(${row.id_reporte},'${row.asunto}','${row.descripcion}', '${row.id_inquilino}','${row.estado}', '${row.imagen}')" class="btn" id="button_ver_mas">
                  <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                <a onclick="guardarDatosDelete(${row.id_reporte})" class="btn" id="button_ver_mas">
                  <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
            </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  getElementById("tbody-reportes").innerHTML = content;
}

//Obtener los datos de combobox tipo propietario
async function fillInquilinosComboBox() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = API_INQUILINOS + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "inquilinos"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "inquilinos_u"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarInquilino = (idSelect) => {
  datos_reporte.id_inquilino = document.getElementById(idSelect).value;
};

//Función para cargar los datos del update
window.guardarDatosUpdate = (
  id_reporte,
  asunto,
  descripcion,
  id_inquilino,
  estado,
  NoUpdatedImage
) => {
  //Se transfieren los datos del boton al json global
  datos_reporte.id_reporte = id_reporte;
  datos_reporte.id_inquilino = id_inquilino;
  datos_reporte.estado = estado;
  datos_reporte.imagen = NoUpdatedImage;
  //Se imprime la información en el modal
  getElementById("inquilinos_u").value = String(id_inquilino);
  getElementById("asunto_update").value = asunto;
  getElementById("descripcion_update").value = descripcion;
  //Se llama el modal de actualizar

  getElementById("eliminarElemento").checked = false

  $("#actualizar").modal("show");
};

// //Función para guardar los datos cambiados en el combobox
// window.cambiarEstadoReporte = () => {
//   datos_reporte.estado = !datos_reporte.estado;
// };

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_reporte) => {
  //Se transfieren los datos del boton al json global
  datos_reporte.id_reporte = id_reporte;
  //Se llama el modal de borrar
  $("#eliminar").modal("show");
};

window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_REPORTES, fillTableReportes)
    isWatchinDeletedData = true
  } else {
    await readRows(API_REPORTES, fillTableReportes);
    isWatchinDeletedData = false
  }
    getElementById("verDatosliminados").checked === true ?  getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
};

window.cambiarVisibilidadDeResgistro = () => {
if(isWatchinDeletedData) {
  getElementById("eliminarElemento").checked === true
  ? (datos_reporte.estado = true)
  : (datos_reporte.estado = false);

} else {
  getElementById("eliminarElemento").checked === true
    ? (datos_reporte.estado = false)
    : (datos_reporte.estado = true);
}
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_REPORTES, "search-bar", fillTableReportes);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
  let parameters = new FormData(getElementById("insert_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("inquilino", datos_reporte.id_inquilino);
  parameters.append("estado", true);
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow(API_REPORTES, API_CREATE, parameters, fillTableReportes);
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
});

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("form_update")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("form_update"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("reporte_id", datos_reporte.id_reporte);
  parameters.append("estado_update", datos_reporte.estado);
  parameters.append("inquilino_update", datos_reporte.id_inquilino);
  parameters.append("NoUpdatedImage", datos_reporte.imagen);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_REPORTES, API_UPDATE, parameters, fillTableReportes);
  // Se cierra el formulario de registro
  getElementById("verDatosliminados").checked = false
  getElementById('textoSwitch').innerHTML = "Hacer invisible"


  $("#actualizar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id_reporte", datos_reporte.id_reporte);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_REPORTES, parameters, fillTableReportes);
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});
