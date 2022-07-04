//Importar las constantes y metodos de components.js y api_constant.js
import { deleteRow, readRows, saveRow, readDeletedRowns } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_ACABADO = SERVER + "privada/tipo_acabado.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
let datos_gestion_acabado = {
  id_gestion_acabado: "",
  nombre_gestion_acabado: "",
  visibilidad: true,
};

let isWatchinDeletedData = false


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);
  getElementById('textoSwitch').innerHTML = "Hacer invisible"
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
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
  getElementById("tbody-tipo-acabado").innerHTML = content;
}


window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_GESTION_ACABADO, fillTableGestionAcabado)
    isWatchinDeletedData = true
  } else {
    await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);
    isWatchinDeletedData = false
  }
    getElementById("verDatosliminados").checked === true ?  getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
};

window.cambiarVisibilidadDeResgistro = () => {
if(isWatchinDeletedData) {
  getElementById("eliminarElemento").checked === true
  ? (datos_gestion_acabado.visibilidad = true)
  : (datos_gestion_acabado.visibilidad = false);

} else {
  getElementById("eliminarElemento").checked === true
    ? (datos_gestion_acabado.visibilidad = false)
    : (datos_gestion_acabado.visibilidad = true);
}
};


//Función para cargar los datos del update
window.guardarDatosUpdate = (
  id_gestion_acabado,
  visibilidad,
  nombre_tipo_acabado
) => {
  //Se transfieren los datos del boton al json global  
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  datos_gestion_acabado.visibilidad = visibilidad;
  //Se imprime la información en el modal
  getElementById("tipo_acabado_update").value = String(nombre_tipo_acabado);
  getElementById("eliminarElemento").checked = false

  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_gestion_acabado) => {
  //Se transfieren los datos del boton al json global  
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  //Se llama el modal de eliminar
  $("#eliminar").modal("show");
};



// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busquedagetElementById("search-bar")
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_GESTION_ACABADO, "search-bar", fillTablePropietario);
});  

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("insert_form"));
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow( API_GESTION_ACABADO, API_CREATE, parameters, fillTableGestionAcabado );
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
});

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("update_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("visibilidad", datos_gestion_acabado.visibilidad);
  parameters.append("id_tipo_acabado", datos_gestion_acabado.id_gestion_acabado);
  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await saveRow( API_GESTION_ACABADO, API_UPDATE, parameters, fillTableGestionAcabado );
  // Se cierra el formulario de registro

  // reinicia el crud
  getElementById("verDatosliminados").checked = false
  getElementById('textoSwitch').innerHTML = "Hacer invisible"
  isWatchinDeletedData = false
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
  parameters.append("id_tipo_acabado", datos_gestion_acabado.id_gestion_acabado);
  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await deleteRow( API_GESTION_ACABADO, parameters, fillTableGestionAcabado );
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});
