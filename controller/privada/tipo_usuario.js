//@ts-check
import { deleteRow, readRows, saveRow, searchRows, readDeletedRowns } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE } from "../constants/api_constant.js";
import { getElementById } from "../constants/helpers.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { inactivityTime } from "../soporte/soporte.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
let datos_tipoUsuario = {
  id_tipo_usuario: "",
  nombre_tipo_usuario: "",
  visibilidad: true,
};

let isWatchinDeletedData = false

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_TIPO_USUARIO, fillTableTipoUsuario);
  inactivityTime();
});


//Metodo para llenar las tablas de datos, utiliza la función readRows()
function fillTableTipoUsuario(dataset) {
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
             <a onclick="guardarDatosUpdate(${row.id_tipo_usuario},${row.visibilidad},'${row.nombre_tipo}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_usuario})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  getElementById("tbody-tipo-usuario").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE USUARIO
window.guardarDatosUpdate = (id_tipoPropiedad, visibilidad, nombre_tipo_usuario) => {
  //Se transfieren los datos del boton al json global  
  datos_tipoUsuario.id_tipo_usuario = id_tipoPropiedad;
  datos_tipoUsuario.visibilidad = visibilidad;


  getElementById("eliminarElemento").checked = false

  //Se imprime la información en el modal

  //Se llama el jquery de actualizar
  $("#actualizar").modal("show");
};


//Función para cargar el id para el delete
window.guardarDatosDelete = (id_tipo_usuario) => {
  //Se transfieren los datos del boton al json global    
  datos_tipoUsuario.id_tipo_usuario = id_tipo_usuario;
  //Se llama el jquery de eliminar      
  $("#eliminar").modal("show");
};


window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_GESTION_TIPO_USUARIO, fillTableTipoUsuario)
    isWatchinDeletedData = true
  } else {
    await readRows(API_GESTION_TIPO_USUARIO, fillTableTipoUsuario);
    isWatchinDeletedData = false
  }
    getElementById("verDatosliminados").checked === true ?  getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
};

window.cambiarVisibilidadDeResgistro = () => {
if(isWatchinDeletedData) {
  getElementById("eliminarElemento").checked === true
  ? (datos_tipoUsuario.visibilidad = true)
  : (datos_tipoUsuario.visibilidad = false);

} else {
  getElementById("eliminarElemento").checked === true
    ? (datos_tipoUsuario.visibilidad = false)
    : (datos_tipoUsuario.visibilidad = true);
}
};



// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_GESTION_TIPO_USUARIO, "search-bar", fillTableTipoUsuario);
});  


// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"  
  let parameters = new FormData(getElementById("insert_form"));
  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
  await saveRow( API_GESTION_TIPO_USUARIO, API_CREATE, parameters, fillTableTipoUsuario );
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
  parameters.append("visibilidad", datos_tipoUsuario.visibilidad);
  parameters.append("id_tipo_usuario", datos_tipoUsuario.id_tipo_usuario);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow( API_GESTION_TIPO_USUARIO, API_UPDATE, parameters, fillTableTipoUsuario );
  // reinicia el crud
  getElementById("verDatosliminados").checked = false
  getElementById('textoSwitch').innerHTML = "Hacer invisible"
  isWatchinDeletedData = false

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
  parameters.append("id_tipo_usuario", datos_tipoUsuario.id_tipo_usuario);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_GESTION_TIPO_USUARIO, parameters, fillTableTipoUsuario);
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});
