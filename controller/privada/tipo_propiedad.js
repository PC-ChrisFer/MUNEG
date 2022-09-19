//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "../APIConnection.js";
import { deleteRow, readRows, saveRow, readDeletedRowns, searchRows } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE, API_SUCESS_REQUEST, GET_METHOD } from "../constants/api_constant.js";
import { getElementById} from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_TIPO_PROPIEDAD = SERVER + "privada/tipo_propiedad.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
let datos_tipoPropiedad = {
  id_tipo_propiedad: "",
  id_tipo_acabado: 0,
  nombre_tipo_propiedad: "",
  visibilidad: true,
  id_categoria: "",
};

let isWatchinDeletedData = false

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

  getElementById('textoSwitch').innerHTML = "Hacer invisible"

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
      getElementById( fieldID ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
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
              <a onclick="guardarDatosUpdate(${row.id_tipo_propiedad},${row.visibilidad},'${row.nombre_tipo}','${row.id_categoria}')" class="btn" id="button_ver_mas">
                <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
              <a onclick="guardarDatosDelete(${row.id_tipo_propiedad})" class="btn" id="button_ver_mas">
                <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
            </td>
         </tr>
        `;
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
  datos_tipoPropiedad.id_categoria = id_categoria
  //Se imprime la información en el modal
  getElementById("tipo_propiedad_update").value = String(nombre_tipo_propiedad)
  getElementById("listado_categorias_id_u").value = String(id_categoria)
  getElementById("eliminarElemento").checked = false


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
    await readDeletedRowns(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad)
    isWatchinDeletedData = true
  } else {
    await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
    isWatchinDeletedData = false
  }
    getElementById("verDatosliminados").checked === true ?  getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
};

window.cambiarVisibilidadDeResgistro = () => {
if(isWatchinDeletedData) {
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
  await searchRows(API_GESTION_TIPO_PROPIEDAD, "search-bar", fillTableTipoInquilino);
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
  await saveRow( API_GESTION_TIPO_PROPIEDAD, API_CREATE, parameters, fillTableTipoPropiedad );
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
  await saveRow( API_GESTION_TIPO_PROPIEDAD, API_UPDATE, parameters, fillTableTipoPropiedad);

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
  parameters.append("id_tipo_propidad", datos_tipoPropiedad.id_tipo_propiedad);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow( API_GESTION_TIPO_PROPIEDAD, parameters, fillTableTipoPropiedad );
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
});
