//@ts-check

import { deleteRow, readRows, saveRow } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE } from "../constants/api_constant.js";

import { getElementById } from "../constants/functions.js";

const API_GESTION_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";

let datos_tipoUsuario = {
  id_tipo_usuario: "",
  nombre_tipo_usuario: "",
  visibilidad: true,
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_TIPO_USUARIO, fillTableTipoPropiedad);
});

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
             <a onclick="guardarDatosUpdate(${row.id_tipo_usuario},${row.visibilidad},'${row.nombre_tipo}')" class="btn" id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_usuario})" class="btn" id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-tipo-usuario").innerHTML = content;
}

//@ts-ignore
window.guardarDatosUpdate = (
  id_tipoPropiedad,
  visibilidad,
  nombre_tipo_usuario
) => {
  datos_tipoUsuario.id_tipo_usuario = id_tipoPropiedad;
  datos_tipoUsuario.visibilidad = visibilidad;

  //@ts-ignore
  getElementById("tipo_usuario_update").value = String(nombre_tipo_usuario);

  //@ts-ignore
  getElementById("switchButton").value = datos_tipoUsuario.visibilidad
    ? "visible"
    : "invisible";
  //@ts-ignore
  $("#actualizar").modal("show");
};

//@ts-ignore
window.guardarDatosDelete = (id_tipo_usuario) => {
  datos_tipoUsuario.id_tipo_usuario = id_tipo_usuario;
  //@ts-ignore
  $("#eliminar").modal("show");
};

//@ts-ignore
window.cambiarEstadoTipoUsuario = () => {
  datos_tipoUsuario.visibilidad = !datos_tipoUsuario.visibilidad;
  // @ts-ignore
  getElementById("switchButton").value = datos_tipoUsuario.visibilidad
    ? "visible"
    : "invisible";
};

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("insert_form"));

  await saveRow(
    API_GESTION_TIPO_USUARIO,
    API_CREATE,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("visibilidad", datos_tipoUsuario.visibilidad);
  //@ts-ignore
  parameters.append("id_tipo_usuario", datos_tipoUsuario.id_tipo_usuario);

  await saveRow(
    API_GESTION_TIPO_USUARIO,
    API_UPDATE,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#actualizar").modal("hide");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id_tipo_usuario", datos_tipoUsuario.id_tipo_usuario);

  await deleteRow(API_GESTION_TIPO_USUARIO, parameters, fillTableTipoPropiedad);

  // @ts-ignore
  $("#eliminar").modal("hide");
});
